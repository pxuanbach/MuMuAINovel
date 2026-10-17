import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Tag, Space, message, Popconfirm, Card, theme, Empty, Badge, Tooltip, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, ThunderboltOutlined, FileTextOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

interface SkillItem {
  template_key: string;
  name: string;
  template_name: string;
  display_name: string;
  category: string;
  description: string;
  triggers: string[];
}

interface SkillDetail {
  template_key: string;
  name: string;
  template_name: string;
  display_name: string;
  category: string;
  description: string;
  triggers: string[];
  body: string;
  raw_content: string;
  standalone_references: Record<string, string>;
}

const parseTriggers = (value: string): string[] => (
  (value || '')
    .split(/[\n,，、]+/)
    .map(item => item.trim())
    .filter(Boolean)
    .filter((item, index, array) => array.indexOf(item) === index)
);

const formatTriggers = (triggers: string[]) => (triggers || []).join('\n');

const normalizeCategory = (value: string | string[]) => (
  Array.isArray(value) ? (value[0] || '').trim() : (value || '').trim()
);

export default function SkillManage() {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillDetail | null>(null);
  const [editForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewingContent, setViewingContent] = useState('');

  const skillCategoryOptions = [
    { label: t('skills.manage.categoryLong'), value: 'Skill·长篇' },
    { label: t('skills.manage.categoryShort'), value: 'Skill·短篇' },
    { label: t('skills.manage.categoryPolish'), value: 'Skill·润色' },
    { label: t('skills.manage.categoryTools'), value: 'Skill·工具' },
    { label: t('skills.manage.categoryDefault'), value: 'Skill' },
  ];

  // 加载 Skill 列表
  const loadSkills = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/skills/list');
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch {
      message.error(t('skills.manage.loadListFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  // 打开编辑弹窗
  const handleEdit = async (skill: SkillItem) => {
    try {
      const response = await fetch(`/api/skills/detail/${skill.template_key}`);
      if (response.ok) {
        const detail: SkillDetail = await response.json();
        setEditingSkill(detail);
        editForm.setFieldsValue({
          name: detail.name,
          display_name: detail.display_name || detail.template_name,
          category: detail.category,
          description: detail.description,
          triggers: formatTriggers(detail.triggers),
          body: detail.body,
          references: JSON.stringify(detail.standalone_references, null, 2),
        });
        setEditModalVisible(true);
      } else {
        message.error(t('skills.manage.loadDetailFailed'));
      }
    } catch {
      message.error(t('skills.manage.loadDetailFailed'));
    }
  };

  // 打开查看原始内容弹窗
  const handleViewRaw = async (skill: SkillItem) => {
    try {
      const response = await fetch(`/api/skills/detail/${skill.template_key}`);
      if (response.ok) {
        const detail: SkillDetail = await response.json();
        setViewingContent(detail.raw_content);
        setViewModalVisible(true);
      }
    } catch {
      message.error(t('skills.manage.loadContentFailed'));
    }
  };

  // 保存编辑
  const handleSaveEdit = async () => {
    if (!editingSkill) return;
    const values = await editForm.validateFields();
    setSaving(true);
    try {
      // 解析 references JSON
      let refs: Record<string, string> | undefined;
      if (values.references?.trim()) {
        try {
          refs = JSON.parse(values.references);
        } catch {
          message.error(t('skills.manage.referencesJsonError'));
          setSaving(false);
          return;
        }
      }

      const triggers = parseTriggers(values.triggers);
      if (triggers.length === 0) {
        message.error(t('skills.manage.triggerRequired'));
        setSaving(false);
        return;
      }
      const category = normalizeCategory(values.category);
      if (!category) {
        message.error(t('skills.manage.categoryRequired'));
        setSaving(false);
        return;
      }

      const response = await fetch(`/api/skills/update/${editingSkill.template_key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: values.display_name,
          category,
          description: values.description,
          triggers,
          body: values.body,
          references: refs,
        }),
      });

      if (response.ok) {
        message.success(t('skills.manage.updateSuccess'));
        setEditModalVisible(false);
        loadSkills();
      } else {
        const err = await response.json();
        message.error(err.detail || t('skills.manage.updateFailed'));
      }
    } catch {
      message.error(t('skills.manage.saveFailed'));
    } finally {
      setSaving(false);
    }
  };

  // 创建新 Skill
  const handleCreate = async () => {
    const values = await createForm.validateFields();
    setSaving(true);
    try {
      let refs: Record<string, string> | undefined;
      if (values.references?.trim()) {
        try {
          refs = JSON.parse(values.references);
        } catch {
          message.error(t('skills.manage.referencesJsonError'));
          setSaving(false);
          return;
        }
      }

      const triggers = parseTriggers(values.triggers);
      if (triggers.length === 0) {
        message.error(t('skills.manage.triggerRequired'));
        setSaving(false);
        return;
      }
      const category = normalizeCategory(values.category);
      if (!category) {
        message.error(t('skills.manage.categoryRequired'));
        setSaving(false);
        return;
      }

      const response = await fetch('/api/skills/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          display_name: values.display_name,
          category,
          description: values.description,
          triggers,
          body: values.body,
          references: refs,
        }),
      });

      if (response.ok) {
        message.success(t('skills.manage.createSuccess'));
        setCreateModalVisible(false);
        createForm.resetFields();
        loadSkills();
      } else {
        const err = await response.json();
        message.error(err.detail || t('skills.manage.createFailed'));
      }
    } catch {
      message.error(t('skills.manage.createFailed'));
    } finally {
      setSaving(false);
    }
  };

  // 删除 Skill
  const handleDelete = async (skillKey: string) => {
    try {
      const response = await fetch(`/api/skills/delete/${skillKey}`, { method: 'DELETE' });
      if (response.ok) {
        message.success(t('skills.manage.deleteSuccess'));
        loadSkills();
      } else {
        const err = await response.json();
        message.error(err.detail || t('skills.manage.deleteFailed'));
      }
    } catch {
      message.error(t('skills.manage.deleteFailed'));
    }
  };

  const columns = [
    {
      title: t('skills.manage.colName'),
      dataIndex: 'display_name',
      key: 'display_name',
      width: 220,
      ellipsis: true,
      render: (text: string, record: SkillItem) => (
        <div style={{ minWidth: 0 }}>
          <Tooltip title={text}>
            <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</strong>
          </Tooltip>
          <Tooltip title={record.name || record.template_key}>
            <span style={{ display: 'block', marginTop: 2, color: token.colorTextTertiary, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {record.name || record.template_key}
            </span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: t('skills.manage.colCategory'),
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (cat: string) => {
        const colorMap: Record<string, string> = {
          'Skill·长篇': 'blue',
          'Skill·短篇': 'green',
          'Skill·润色': 'orange',
          'Skill·工具': 'purple',
          'Skill': 'default',
        };
        return <Tag color={colorMap[cat] || 'default'}>{cat}</Tag>;
      },
    },
    {
      title: t('skills.manage.colDescription'),
      dataIndex: 'description',
      key: 'description',
      width: 260,
      ellipsis: true,
      render: (text: string) => (
        <Tooltip title={text}>
          <span
            style={{
              display: 'block',
              maxWidth: 240,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: token.colorTextSecondary,
              fontSize: 13,
            }}
          >
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: t('skills.manage.colTriggers'),
      dataIndex: 'triggers',
      key: 'triggers',
      width: 180,
      render: (triggers: string[]) => (
        <Space wrap size={4}>
          {triggers.slice(0, 3).map((trigger, i) => (
            <Tag key={i} style={{ fontSize: 11 }}>{trigger}</Tag>
          ))}
          {triggers.length > 3 && <Tag>+{triggers.length - 3}</Tag>}
        </Space>
      ),
    },
    {
      title: t('skills.manage.colActions'),
      key: 'actions',
      width: 200,
      render: (_: unknown, record: SkillItem) => (
        <Space>
          <Button
            type="text"
            icon={<FileTextOutlined />}
            onClick={() => handleViewRaw(record)}
            size="small"
          >
            {t('skills.manage.view')}
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            {t('skills.manage.edit')}
          </Button>
          <Popconfirm
            title={t('skills.manage.deleteConfirmTitle')}
            description={t('skills.manage.deleteConfirmContent')}
            onConfirm={() => handleDelete(record.template_key)}
            okText={t('skills.manage.delete')}
            cancelText={t('skills.manage.cancel')}
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small">
              {t('skills.manage.delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部标题栏 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20 }}>
            <ThunderboltOutlined style={{ marginRight: 8, color: token.colorPrimary }} />
            {t('skills.manage.title')}
            <Badge count={skills.length} style={{ marginLeft: 8, backgroundColor: token.colorPrimary }} />
          </h2>
          <div style={{ fontSize: 12, color: token.colorTextSecondary, marginTop: 4 }}>
            {t('skills.manage.subtitle')}
          </div>
        </div>
        <Space wrap>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadSkills}
            loading={loading}
          >
            {t('skills.manage.refresh')}
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              createForm.resetFields();
              setCreateModalVisible(true);
            }}
          >
            {t('skills.manage.addSkill')}
          </Button>
        </Space>
      </div>

      {/* Skill 列表 */}
      {skills.length === 0 && !loading ? (
        <Card>
          <Empty description={t('skills.manage.empty')}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>
              {t('skills.manage.addSkill')}
            </Button>
          </Empty>
        </Card>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Table
            dataSource={skills}
            columns={columns}
            rowKey="template_key"
            loading={loading}
            pagination={false}
            size="middle"
            style={{ background: token.colorBgContainer }}
          />
        </div>
      )}

      {/* 查看原始内容弹窗 */}
      <Modal
        title={t('skills.manage.rawModalTitle')}
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        width={800}
        footer={<Button onClick={() => setViewModalVisible(false)}>{t('skills.manage.close')}</Button>}
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto' } }}
      >
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: 13,
          lineHeight: 1.6,
          background: token.colorFillQuaternary,
          padding: 16,
          borderRadius: 8,
        }}>
          {viewingContent}
        </pre>
      </Modal>

      {/* 编辑 Skill 弹窗 */}
      <Modal
        title={t('skills.manage.editModalTitle')}
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        width={900}
        footer={
          <Space>
            <Button onClick={() => setEditModalVisible(false)}>{t('skills.manage.cancel')}</Button>
            <Button type="primary" onClick={handleSaveEdit} loading={saving}>{t('skills.manage.save')}</Button>
          </Space>
        }
        styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical">
          <Form.Item label={t('skills.manage.internalId')} name="name" tooltip={t('skills.manage.internalIdTooltip')}>
            <Input disabled />
          </Form.Item>
          <Form.Item label={t('skills.manage.displayName')} name="display_name" rules={[{ required: true, whitespace: true, message: t('skills.manage.displayNameRequired') }]}
            tooltip={t('skills.manage.displayNameTooltip')}>
            <Input placeholder={t('skills.manage.displayNamePlaceholder')} maxLength={60} />
          </Form.Item>
          <Form.Item label={t('skills.manage.category')} name="category" rules={[{ required: true, message: t('skills.manage.categorySelectRequired') }]}
            tooltip={t('skills.manage.categoryTooltip')}>
            <Select
              showSearch
              options={skillCategoryOptions}
              placeholder={t('skills.manage.categoryPlaceholder')}
              mode="tags"
              maxCount={1}
              tokenSeparators={[',', '，', '、']}
            />
          </Form.Item>
          <Form.Item label={t('skills.manage.description')} name="description" rules={[{ required: true, whitespace: true, message: t('skills.manage.descriptionRequired') }]}
            tooltip={t('skills.manage.descriptionTooltip')}>
            <TextArea rows={4} placeholder={t('skills.manage.descriptionPlaceholder')} />
          </Form.Item>
          <Form.Item label={t('skills.manage.triggers')} name="triggers" rules={[{ required: true, whitespace: true, message: t('skills.manage.triggerRequired') }]}
            tooltip={t('skills.manage.triggersTooltip')}>
            <TextArea rows={4} placeholder={t('skills.manage.triggersPlaceholderEdit')} />
          </Form.Item>
          <Form.Item label={t('skills.manage.body')} name="body" rules={[{ required: true, message: t('skills.manage.bodyRequired') }]}
            tooltip={t('skills.manage.bodyTooltip')}>
            <TextArea rows={15} placeholder={t('skills.manage.bodyPlaceholder')} style={{ fontFamily: 'monospace', fontSize: 13 }} />
          </Form.Item>
          <Form.Item label={t('skills.manage.references')} name="references"
            tooltip={t('skills.manage.referencesTooltip')}>
            <TextArea rows={8} placeholder={t('skills.manage.referencesPlaceholderEdit')} style={{ fontFamily: 'monospace', fontSize: 12 }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 创建 Skill 弹窗 */}
      <Modal
        title={t('skills.manage.addModalTitle')}
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        width={900}
        footer={
          <Space>
            <Button onClick={() => setCreateModalVisible(false)}>{t('skills.manage.cancel')}</Button>
            <Button type="primary" onClick={handleCreate} loading={saving}>{t('skills.manage.create')}</Button>
          </Space>
        }
        styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
        destroyOnClose
      >
        <Form form={createForm} layout="vertical">
          <Form.Item label={t('skills.manage.skillNameEn')} name="name" rules={[{ required: true, message: t('skills.manage.nameRequired') }]}
            tooltip={t('skills.manage.skillNameTooltip')}>
            <Input placeholder="my-new-skill" />
          </Form.Item>
          <Form.Item label={t('skills.manage.displayName')} name="display_name" rules={[{ required: true, whitespace: true, message: t('skills.manage.displayNameRequired') }]}
            tooltip={t('skills.manage.displayNameTooltip')}>
            <Input placeholder={t('skills.manage.displayNamePlaceholderNew')} maxLength={60} />
          </Form.Item>
          <Form.Item label={t('skills.manage.category')} name="category" rules={[{ required: true, message: t('skills.manage.categorySelectRequired') }]}
            tooltip={t('skills.manage.categoryTooltip')}>
            <Select
              showSearch
              options={skillCategoryOptions}
              placeholder={t('skills.manage.categoryPlaceholder')}
              mode="tags"
              maxCount={1}
              tokenSeparators={[',', '，', '、']}
            />
          </Form.Item>
          <Form.Item label={t('skills.manage.description')} name="description" rules={[{ required: true, whitespace: true, message: t('skills.manage.descriptionRequired') }]}
            tooltip={t('skills.manage.descriptionTooltip')}>
            <TextArea rows={4} placeholder={t('skills.manage.descriptionPlaceholder')} />
          </Form.Item>
          <Form.Item label={t('skills.manage.triggers')} name="triggers" rules={[{ required: true, whitespace: true, message: t('skills.manage.triggerRequired') }]}
            tooltip={t('skills.manage.triggersTooltip')}>
            <TextArea rows={4} placeholder={t('skills.manage.triggersPlaceholderCreate')} />
          </Form.Item>
          <Form.Item label={t('skills.manage.body')} name="body" rules={[{ required: true, message: t('skills.manage.bodyRequired') }]}
            tooltip={t('skills.manage.bodyTooltipCreate')}>
            <TextArea rows={15} placeholder={"# my-new-skill：Skill 标题\n\n你是 xxx 专家。你的任务是帮用户完成 xxx。\n\n## 核心原则\n\n- 原则1...\n\n## 工作流程\n\n### Phase 1：需求确认\n..."} style={{ fontFamily: 'monospace', fontSize: 13 }} />
          </Form.Item>
          <Form.Item label={t('skills.manage.referencesOptional')} name="references"
            tooltip={t('skills.manage.referencesTooltipShort')}>
            <TextArea rows={8} placeholder={t('skills.manage.referencesPlaceholderCreate')} style={{ fontFamily: 'monospace', fontSize: 12 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
