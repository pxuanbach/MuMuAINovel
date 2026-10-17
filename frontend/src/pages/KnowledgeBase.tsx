import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Input,
  InputNumber,
  List,
  Row,
  Space,
  Spin,
  Statistic,
  Switch,
  Tag,
  Typography,
  Upload,
  message,
  theme,
} from 'antd';
import {
  DatabaseOutlined,
  DeleteOutlined,
  InboxOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { UploadProps } from 'antd';
import { knowledgeApi } from '../services/api';
import type { KnowledgeBase, KnowledgeDocument, KnowledgeSearchHit } from '../types';
import './KnowledgeBase.css';

const { Dragger } = Upload;
const { Text, Paragraph, Title } = Typography;

const parseHeadingPath = (value: unknown): string => {
  if (Array.isArray(value)) return value.map(String).filter(Boolean).join(' / ');
  if (!value) return '';
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean).join(' / ') : String(value);
  } catch {
    return String(value);
  }
};

export default function KnowledgeBasePage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: t('knowledgeBase.status.pending'), color: 'default' },
    parsing: { label: t('knowledgeBase.status.parsing'), color: 'processing' },
    embedding: { label: t('knowledgeBase.status.embedding'), color: 'processing' },
    ready: { label: t('knowledgeBase.status.ready'), color: 'success' },
    failed: { label: t('knowledgeBase.status.failed'), color: 'error' },
  };

  const [base, setBase] = useState<KnowledgeBase | null>(null);
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<KnowledgeSearchHit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [retrievalEnabled, setRetrievalEnabled] = useState(true);
  const [topK, setTopK] = useState(8);
  const [minScore, setMinScore] = useState(0.25);
  const [maxContextChars, setMaxContextChars] = useState(6000);
  const [savingSettings, setSavingSettings] = useState(false);

  const load = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const bases = await knowledgeApi.listBases(projectId);
      let current = bases.items[0];
      if (!current) {
        current = (await knowledgeApi.createBase(projectId, {
          name: '项目知识库',
          description: '用于存放本项目的参考资料和设定文档',
        })).item;
      }
      setBase(current);
      setRetrievalEnabled(current.settings?.retrieval_enabled ?? true);
      setTopK(current.settings?.top_k ?? 8);
      setMinScore(current.settings?.min_score ?? 0.25);
      setMaxContextChars(current.settings?.max_context_chars ?? 6000);
      setDocuments((await knowledgeApi.listDocuments(current.id)).items);
    } catch (error) {
      console.error('加载知识库失败', error);
      message.error(t('knowledgeBase.loadFailed'));
    } finally {
      setLoading(false);
    }
  }, [projectId, t]);

  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    if (!documents.some((item) => ['pending', 'parsing', 'embedding'].includes(item.status))) return;
    const timer = window.setInterval(() => { void load(); }, 2500);
    return () => window.clearInterval(timer);
  }, [documents, load]);

  const uploadProps: UploadProps = useMemo(() => ({
    multiple: true,
    accept: '.txt,.md,.markdown,.json',
    showUploadList: false,
    beforeUpload: async (file) => {
      if (!base) return false;
      try {
        await knowledgeApi.uploadDocument(base.id, file);
        message.success(t('knowledgeBase.uploadQueued', { name: file.name }));
        await load();
      } catch (error) {
        console.error('上传知识库文档失败', error);
        message.error(error instanceof Error ? error.message : t('knowledgeBase.uploadFailed'));
      }
      return false;
    },
  }), [base, load, t]);

  const saveRetrievalSettings = async () => {
    if (!base) return;
    setSavingSettings(true);
    try {
      const response = await knowledgeApi.updateBase(base.id, {
        settings: {
          retrieval_enabled: retrievalEnabled,
          top_k: topK,
          min_score: minScore,
          max_context_chars: maxContextChars,
        },
      });
      setBase(response.item);
      message.success(t('knowledgeBase.retrievalSaved'));
    } catch (error) {
      console.error('保存检索参数失败', error);
      message.error(t('knowledgeBase.retrievalSaveFailed'));
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSearch = async () => {
    if (!base || !query.trim()) return;
    setSearching(true);
    try {
      setHits((await knowledgeApi.search(base.id, { query: query.trim(), top_k: topK, min_score: minScore })).items);
    } catch (error) {
      console.error('检索知识库失败', error);
      message.error(t('knowledgeBase.searchFailed'));
    } finally {
      setSearching(false);
    }
  };

  const remove = async (document: KnowledgeDocument) => {
    try {
      await knowledgeApi.deleteDocument(document.id);
      message.success(t('knowledgeBase.documentDeleted'));
      await load();
    } catch (error) {
      console.error('删除知识库文档失败', error);
      message.error(t('knowledgeBase.deleteFailed'));
    }
  };

  const reindex = async (document: KnowledgeDocument) => {
    try {
      await knowledgeApi.reindexDocument(document.id);
      message.success(t('knowledgeBase.reindexQueued'));
      await load();
    } catch (error) {
      console.error('重建知识库索引失败', error);
      message.error(t('knowledgeBase.reindexFailed'));
    }
  };

  if (loading && !base) {
    return <Spin size="large" style={{ display: 'block', margin: '80px auto' }} />;
  }

  return (
    <div className="knowledge-base-page">
      <div
        style={{
          backgroundColor: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          flexShrink: 0,
        }}
      >
        <Flex justify="space-between" align="flex-start" gap={16} wrap="wrap">
          <Flex align="center" gap={12} style={{ minWidth: 0 }}>
            <DatabaseOutlined style={{ fontSize: 26, color: token.colorPrimary, flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <Title level={2} style={{ margin: 0, lineHeight: 1.2 }}>
                {base?.name || t('knowledgeBase.defaultBaseName')}
              </Title>
              <Text type="secondary">
                {t('knowledgeBase.headerDescription')}
              </Text>
            </div>
          </Flex>
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => void load()}>
            {t('knowledgeBase.refresh')}
          </Button>
        </Flex>
      </div>

      <div className="knowledge-base-main">
        {base && (
          <Card size="small" className="knowledge-base-summary">
            <Row gutter={[16, 12]}>
              <Col xs={12} sm={8}>
                <Statistic title={t('knowledgeBase.stats.documents')} value={base.document_count} suffix={t('knowledgeBase.stats.documentsSuffix')} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title={t('knowledgeBase.stats.chunks')} value={base.chunk_count} suffix={t('knowledgeBase.stats.chunksSuffix')} />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic title={t('knowledgeBase.stats.indexMethod')} value={t('knowledgeBase.stats.indexMethodValue')} valueStyle={{ fontSize: 20, color: token.colorPrimary }} />
              </Col>
            </Row>
          </Card>
        )}

        <div className="knowledge-base-panels">
          <div className="knowledge-base-panel">
            <Card
              className="knowledge-base-panel-card"
              title={<Space><InboxOutlined />{t('knowledgeBase.documents.title')}<Tag>{documents.length}</Tag></Space>}
              extra={<Button type="text" icon={<ReloadOutlined />} loading={loading} onClick={() => void load()} />}
            >
              <Dragger {...uploadProps} style={{ marginBottom: 18 }}>
                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p className="ant-upload-text">{t('knowledgeBase.upload.dragText')}</p>
                <p className="ant-upload-hint">{t('knowledgeBase.upload.hint')}</p>
              </Dragger>
              <List
                className="knowledge-base-document-list"
                dataSource={documents}
                split
                locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('knowledgeBase.documents.empty')} /> }}
                renderItem={(document) => {
                  const status = statusMap[document.status] || statusMap.pending;
                  return (
                    <List.Item
                      actions={[
                        document.status === 'failed' || document.status === 'ready'
                          ? <Button key="reindex" type="link" size="small" onClick={() => void reindex(document)}>{t('knowledgeBase.documents.reindex')}</Button>
                          : null,
                        <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={() => void remove(document)} />,
                      ].filter(Boolean)}
                    >
                      <List.Item.Meta
                        title={<Space wrap>{document.title}<Tag color={status.color}>{status.label}</Tag></Space>}
                        description={(
                          <Space direction="vertical" size={0}>
                            <Text type="secondary">{document.original_filename}</Text>
                            <Text type="secondary">
                              {t('knowledgeBase.document.chunksAndChars', { chunks: document.chunk_count, chars: document.extracted_char_count.toLocaleString() })}
                            </Text>
                            {document.error_message && <Text type="danger">{document.error_message}</Text>}
                          </Space>
                        )}
                      />
                    </List.Item>
                  );
                }}
              />
            </Card>
          </div>

          <div className="knowledge-base-panel">
            <Card
              className="knowledge-base-panel-card"
              title={<Space><SearchOutlined />{t('knowledgeBase.search.title')}</Space>}
            >
              <Flex gap={8} wrap="wrap" align="center" style={{ marginBottom: 12 }}>
                <Text type="secondary">{t('knowledgeBase.search.autoInject')}</Text>
                <Switch size="small" checked={retrievalEnabled} onChange={setRetrievalEnabled} />
                <Text type="secondary">{t('knowledgeBase.search.topK')}</Text>
                <InputNumber min={1} max={30} value={topK} onChange={(value) => setTopK(value ?? 8)} />
                <Text type="secondary">{t('knowledgeBase.search.minScore')}</Text>
                <InputNumber min={0} max={1} step={0.05} precision={2} value={minScore} onChange={(value) => setMinScore(value ?? 0.25)} />
                <Text type="secondary">{t('knowledgeBase.search.maxContextChars')}</Text>
                <InputNumber min={1000} max={20000} step={500} value={maxContextChars} onChange={(value) => setMaxContextChars(value ?? 6000)} />
                <Button size="small" loading={savingSettings} onClick={() => void saveRetrievalSettings()}>{t('knowledgeBase.search.saveSettings')}</Button>
              </Flex>
              <Input.Search
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onSearch={() => void handleSearch()}
                loading={searching}
                enterButton={t('knowledgeBase.search.button')}
                placeholder={t('knowledgeBase.search.placeholder')}
                size="large"
              />
              <List
                className="knowledge-base-search-list"
                itemLayout="vertical"
                dataSource={hits}
                locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={query ? t('knowledgeBase.search.emptyWithQuery') : t('knowledgeBase.search.emptyPrompt')} /> }}
                renderItem={(hit) => {
                  const metadata = hit.metadata || {};
                  const heading = parseHeadingPath(metadata.heading_path);
                  return (
                    <List.Item style={{ paddingInline: 0 }}>
                      <div
                        style={{
                          width: '100%',
                          padding: 14,
                          background: token.colorFillAlter,
                          border: `1px solid ${token.colorBorderSecondary}`,
                          borderRadius: token.borderRadius,
                        }}
                      >
                        <Flex gap={8} wrap="wrap" align="center" style={{ marginBottom: 8 }}>
                          <Tag color="blue">{t('knowledgeBase.search.score', { score: (hit.score * 100).toFixed(0) })}</Tag>
                          <Text strong>{metadata.original_filename || metadata.title || t('knowledgeBase.search.defaultDocument')}</Text>
                          {heading && <Text type="secondary">{heading}</Text>}
                        </Flex>
                        <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap' }}>{hit.content}</Paragraph>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
