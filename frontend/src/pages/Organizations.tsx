import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card, Table, Tag, Button, Space, message, Modal, Form, Select, InputNumber, Input, Descriptions, Drawer, theme } from 'antd';
import { PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined, UnorderedListOutlined, BankOutlined } from '@ant-design/icons';
import { useStore } from '../store';
import { useCharacterSync } from '../store/hooks';
import axios from 'axios';
import { eventBus, EventNames } from '../store/eventBus';

interface Organization {
  id: string;
  character_id: string;
  name: string;
  type: string;
  purpose: string;
  member_count: number;
  power_level: number;
  location?: string;
  motto?: string;
  color?: string;
}

interface OrganizationMember {
  id: string;
  character_id: string;
  character_name: string;
  position: string;
  rank: number;
  loyalty: number;
  contribution: number;
  status: string;
  joined_at?: string;
  left_at?: string;
  notes?: string;
}

interface Character {
  id: string;
  name: string;
  is_organization: boolean;
}

export default function Organizations() {
  const { projectId } = useParams<{ projectId: string }>();
  const { currentProject } = useStore();
  const { refreshCharacters } = useCharacterSync();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isEditMemberModalOpen, setIsEditMemberModalOpen] = useState(false);
  const [isEditOrgModalOpen, setIsEditOrgModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<OrganizationMember | null>(null);
  const [form] = Form.useForm();
  const [editMemberForm] = Form.useForm();
  const [editOrgForm] = Form.useForm();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [modal, contextHolder] = Modal.useModal();
  const [orgListVisible, setOrgListVisible] = useState(false);
  const { token } = theme.useToken();
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadOrganizations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/organizations/project/${projectId}`);
      setOrganizations(res.data);
      if (res.data.length > 0 && !selectedOrg) {
        setSelectedOrg(res.data[0]);
        loadMembers(res.data[0].id);
      }
    } catch (error) {
      message.error(t('organizations.loadListFailed'));
      console.error(error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const loadCharacters = useCallback(async () => {
    try {
      const res = await axios.get(`/api/characters?project_id=${projectId}`);
      setCharacters(res.data.items || []);
    } catch (error) {
      console.error('加载角色列表失败', error);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      loadOrganizations();
      loadCharacters();
    }
  }, [projectId, loadOrganizations, loadCharacters]);

  useEffect(() => {
    const handleTaskSettled = (payload?: unknown) => {
      if (!payload || typeof payload !== 'object') return;
      const data = payload as { projectId?: string; resources?: string[] };
      if (data.projectId && data.projectId !== projectId) return;
      if (!data.resources?.includes('organizations')) return;
      void loadOrganizations();
      void loadCharacters();
      if (selectedOrg?.id) void loadMembers(selectedOrg.id);
    };
    eventBus.on(EventNames.BACKGROUND_TASK_SETTLED, handleTaskSettled);
    return () => eventBus.off(EventNames.BACKGROUND_TASK_SETTLED, handleTaskSettled);
  }, [loadCharacters, loadOrganizations, projectId, selectedOrg?.id]);

  const loadMembers = async (orgId: string) => {
    try {
      const res = await axios.get(`/api/organizations/${orgId}/members`);
      setMembers(res.data);
    } catch (error) {
      message.error(t('organizations.loadMembersFailed'));
      console.error(error);
    }
  };

  const handleSelectOrganization = (org: Organization) => {
    setSelectedOrg(org);
    loadMembers(org.id);
  };

  const handleAddMember = async (values: Record<string, unknown>) => {
    if (!selectedOrg) return;

    try {
      await axios.post(`/api/organizations/${selectedOrg.id}/members`, values);
      message.success(t('organizations.memberAddSuccess'));
      setIsAddMemberModalOpen(false);
      form.resetFields();
      loadMembers(selectedOrg.id);
      loadOrganizations(); // 刷新成员计数
    } catch (error) {
      message.error(t('organizations.memberAddFailed'));
      console.error(error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    modal.confirm({
      title: t('organizations.removeConfirmTitle'),
      content: t('organizations.removeConfirmContent'),
      centered: true,
      okText: t('organizations.remove'),
      okType: 'danger',
      cancelText: t('organizations.cancel'),
      onOk: async () => {
        try {
          await axios.delete(`/api/organizations/members/${memberId}`);
          message.success(t('organizations.memberRemoveSuccess'));
          if (selectedOrg) {
            loadMembers(selectedOrg.id);
            loadOrganizations(); // 刷新成员计数
          }
        } catch (error) {
          message.error(t('organizations.removeFailed'));
          console.error(error);
        }
      }
    });
  };

  const handleEditMember = (member: OrganizationMember) => {
    setEditingMember(member);
    editMemberForm.setFieldsValue({
      position: member.position,
      rank: member.rank,
      loyalty: member.loyalty,
      contribution: member.contribution,
      status: member.status,
      notes: member.notes,
      joined_at: member.joined_at
    });
    setIsEditMemberModalOpen(true);
  };

  const handleUpdateMember = async (values: Record<string, unknown>) => {
    if (!editingMember) return;

    try {
      await axios.put(`/api/organizations/members/${editingMember.id}`, values);
      message.success(t('organizations.memberUpdateSuccess'));
      setIsEditMemberModalOpen(false);
      editMemberForm.resetFields();
      setEditingMember(null);
      if (selectedOrg) {
        loadMembers(selectedOrg.id);
      }
    } catch (error) {
      message.error(t('organizations.updateFailed'));
      console.error(error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'green',
      retired: 'default',
      expelled: 'red',
      deceased: 'black'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      active: t('organizations.statusActive'),
      retired: t('organizations.statusRetired'),
      expelled: t('organizations.statusExpelled'),
      deceased: t('organizations.statusDeceased')
    };
    return texts[status] || status;
  };

  const memberColumns = [
    {
      title: t('organizations.colName'),
      dataIndex: 'character_name',
      key: 'name',
      render: (name: string) => (
        <Space>
          <UserOutlined />
          <span>{name}</span>
        </Space>
      ),
      width: isMobile ? 100 : undefined,
    },
    {
      title: t('organizations.colPosition'),
      dataIndex: 'position',
      key: 'position',
      render: (position: string, record: OrganizationMember) => (
        <Tag color="blue">{position} {!isMobile && t('organizations.rankLevel', { rank: record.rank })}</Tag>
      ),
      width: isMobile ? 120 : undefined,
    },
    {
      title: t('organizations.colLoyalty'),
      dataIndex: 'loyalty',
      key: 'loyalty',
      render: (loyalty: number) => (
        <span style={{ color: loyalty >= 70 ? 'green' : loyalty >= 40 ? 'orange' : 'red' }}>
          {loyalty}%
        </span>
      ),
      width: isMobile ? 80 : undefined,
    },
    {
      title: t('organizations.colContribution'),
      dataIndex: 'contribution',
      key: 'contribution',
      render: (contribution: number) => `${contribution}%`,
      width: isMobile ? 80 : undefined,
    },
    {
      title: t('organizations.colStatus'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
      width: isMobile ? 80 : undefined,
    },
    {
      title: t('organizations.colJoinedAt'),
      dataIndex: 'joined_at',
      key: 'joined_at',
      render: (time: string) => time || '-',
      width: isMobile ? 120 : undefined,
    },
    {
      title: t('organizations.colAction'),
      key: 'action',
      render: (_: unknown, record: OrganizationMember) => (
        <Space size={isMobile ? 0 : 'small'}>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditMember(record)}
            style={isMobile ? { padding: '4px' } : undefined}
          >
            {isMobile ? '' : t('organizations.edit')}
          </Button>
          <Button
            type="link"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveMember(record.id)}
            style={isMobile ? { padding: '4px' } : undefined}
          >
            {isMobile ? '' : t('organizations.remove')}
          </Button>
        </Space>
      ),
      width: isMobile ? 50 : undefined,
      fixed: isMobile ? 'right' as const : undefined,
    },
  ];

  // 过滤掉已是成员的角色
  const availableCharacters = characters.filter(
    c => !c.is_organization && !members.some(m => m.character_id === c.id)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {contextHolder}
      
      {/* 页面标题 - 仅桌面端显示 */}
      {!isMobile && (
        <div style={{
          padding: '16px 0',
          marginBottom: 16,
          borderBottom: `1px solid ${token.colorBorderSecondary}`
        }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>
            <BankOutlined style={{ marginRight: 8 }} />
            {t('organizations.title')}
          </h2>
        </div>
      )}
      
      <div style={{
        flex: 1,
        display: 'flex',
        gap: isMobile ? 0 : 16,
        flexDirection: isMobile ? 'column' : 'row',
        overflow: 'hidden'
      }}>
        {/* 左侧组织列表 - 桌面端 */}
        {!isMobile && (
        <Card
          title={t('organizations.orgListTitle', { count: organizations.length })}
          style={{ width: 300, height: '100%', overflow: 'hidden' }}
          bodyStyle={{ padding: 0, height: 'calc(100% - 57px)', overflow: 'auto' }}
          loading={loading}
        >
          {organizations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: token.colorTextTertiary }}>
              {t('organizations.noOrganizations')}
            </div>
          ) : (
            <Space direction="vertical" style={{ width: '100%', padding: '12px' }}>
              {organizations.map(org => (
                <Card
                  key={org.id}
                  size="small"
                  hoverable
                  style={{
                    cursor: 'pointer',
                    border: selectedOrg?.id === org.id ? `2px solid ${token.colorPrimary}` : `1px solid ${token.colorBorder}`,
                    background: selectedOrg?.id === org.id ? token.colorPrimaryBg : 'transparent'
                  }}
                  onClick={() => handleSelectOrganization(org)}
                >
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <strong style={{ fontSize: 14 }}>{org.name}</strong>
                    <Tag color="blue">{org.type}</Tag>
                    <div style={{ fontSize: '12px', color: token.colorTextSecondary }}>
                      {t('organizations.memberPower', { members: org.member_count, power: org.power_level })}
                    </div>
                  </Space>
                </Card>
              ))}
            </Space>
          )}
        </Card>
        )}

      {/* 移动端组织列表抽屉 */}
      {isMobile && (
        <Drawer
          title={t('organizations.orgList')}
          placement="left"
          onClose={() => setOrgListVisible(false)}
          open={orgListVisible}
          width="85%"
          styles={{ body: { padding: 0 } }}
        >
          {organizations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: token.colorTextTertiary }}>
              {t('organizations.noOrganizations')}
            </div>
          ) : (
            <Space direction="vertical" style={{ width: '100%', padding: '12px' }}>
              {organizations.map(org => (
                <Card
                  key={org.id}
                  size="small"
                  hoverable
                  style={{
                    cursor: 'pointer',
                    border: selectedOrg?.id === org.id ? `2px solid ${token.colorPrimary}` : `1px solid ${token.colorBorder}`,
                    background: selectedOrg?.id === org.id ? token.colorPrimaryBg : 'transparent'
                  }}
                  onClick={() => {
                    handleSelectOrganization(org);
                    setOrgListVisible(false);
                  }}
                >
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <strong style={{ fontSize: 14 }}>{org.name}</strong>
                    <Tag color="blue">{org.type}</Tag>
                    <div style={{ fontSize: '12px', color: token.colorTextSecondary }}>
                      {t('organizations.memberPower', { members: org.member_count, power: org.power_level })}
                    </div>
                  </Space>
                </Card>
              ))}
            </Space>
          )}
        </Drawer>
        )}

        {/* 右侧内容区域 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {!selectedOrg ? (
          <Card style={{ height: '100%' }}>
            <div style={{ textAlign: 'center', padding: '100px 20px', color: token.colorTextTertiary }}>
              {isMobile && organizations.length > 0 && (
                <Button
                  type="primary"
                  icon={<UnorderedListOutlined />}
                  onClick={() => setOrgListVisible(true)}
                  style={{ marginBottom: 20 }}
                >
                  {t('organizations.selectOrganization')}
                </Button>
              )}
              <div>{t('organizations.selectOrganizationHint')}</div>
            </div>
          </Card>
        ) : (
          <>
            {/* 工具栏 - 移动端显示项目标题和组织列表按钮 */}
            {isMobile && (
              <Card size="small" style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <BankOutlined />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>
                      {t('organizations.title')}
                    </span>
                    <Tag color="blue">{currentProject?.title}</Tag>
                  </Space>
                  <Button
                    icon={<UnorderedListOutlined />}
                    onClick={() => setOrgListVisible(true)}
                    size="small"
                  >
                    {t('organizations.list')}
                  </Button>
                </div>
              </Card>
            )}

            {/* 内容区域 */}
            <div style={{
              flex: 1,
              display: 'flex',
              gap: isMobile ? 0 : 16,
              overflow: 'hidden'
            }}>
              <Card
                style={{ flex: 1, overflow: 'auto' }}
                bodyStyle={{ padding: isMobile ? '12px' : '24px' }}
              >
                <Space direction="vertical" style={{ width: '100%' }} size={isMobile ? 'middle' : 'large'}>
                <Card
                  title={t('organizations.orgDetail')}
                  size="small"
                  extra={
                    <Button
                      type="link"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => {
                        editOrgForm.setFieldsValue({
                          power_level: selectedOrg.power_level,
                          location: selectedOrg.location,
                          motto: selectedOrg.motto,
                          color: selectedOrg.color
                        });
                        setIsEditOrgModalOpen(true);
                      }}
                    >
                      {t('organizations.edit')}
                    </Button>
                  }
                >
                  <Descriptions column={isMobile ? 1 : 2} size="small">
                    <Descriptions.Item label={t('organizations.orgName')}>{selectedOrg.name}</Descriptions.Item>
                    <Descriptions.Item label={t('organizations.type')}>{selectedOrg.type}</Descriptions.Item>
                    <Descriptions.Item label={t('organizations.memberCount')}>{selectedOrg.member_count}</Descriptions.Item>
                    <Descriptions.Item label={t('organizations.powerLevel')}>
                      <Tag color={selectedOrg.power_level >= 70 ? 'red' : selectedOrg.power_level >= 50 ? 'orange' : 'default'}>
                        {selectedOrg.power_level}
                      </Tag>
                    </Descriptions.Item>
                    {selectedOrg.location && (
                      <Descriptions.Item label={t('organizations.location')} span={isMobile ? 1 : 2}>
                        {selectedOrg.location}
                      </Descriptions.Item>
                    )}
                    {selectedOrg.color && (
                      <Descriptions.Item label={t('organizations.color')}>
                        {selectedOrg.color}
                      </Descriptions.Item>
                    )}
                    {selectedOrg.motto && (
                      <Descriptions.Item label={t('organizations.motto')} span={2}>
                        {selectedOrg.motto}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label={t('organizations.purpose')} span={2}>
                      {selectedOrg.purpose}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card
                  title={t('organizations.memberListTitle', { count: members.length })}
                  extra={
                    <Button
                      type="primary"
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => setIsAddMemberModalOpen(true)}
                      disabled={availableCharacters.length === 0}
                    >
                      {t('organizations.addMember')}
                    </Button>
                  }
                >
                  <Table
                    columns={memberColumns}
                    dataSource={members}
                    rowKey="id"
                    pagination={
                      members.length > 5
                        ? {
                          defaultPageSize: 5,
                          showSizeChanger: true,
                          showQuickJumper: !isMobile,
                          showTotal: (total) => t('organizations.totalMembers', { total }),
                          pageSizeOptions: [5, 10, 20],
                          simple: isMobile,
                          position: ['bottomCenter'],
                        }
                        : false
                    }
                    size="small"
                    scroll={{
                      x: isMobile ? 'max-content' : undefined,
                      y: members.length > 10 ? 500 : undefined,
                    }}
                  />
                </Card>
                </Space>
              </Card>
            </div>
          </>
        )}
        </div>
      </div>

      {/* 添加成员模态框 */}
      <Modal
        title={t('organizations.addMemberTitle')}
        open={isAddMemberModalOpen}
        onCancel={() => {
          setIsAddMemberModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        centered={!isMobile}
        width={isMobile ? '100%' : 500}
        style={isMobile ? { top: 0, paddingBottom: 0, maxWidth: '100vw' } : undefined}
        styles={isMobile ? { body: { maxHeight: 'calc(100vh - 110px)', overflowY: 'auto' } } : undefined}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddMember}
        >
          <Form.Item
            name="character_id"
            label={t('organizations.selectCharacter')}
            rules={[{ required: true, message: t('organizations.selectCharacterRequired') }]}
          >
            <Select
              placeholder={t('organizations.selectCharacterPlaceholder')}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={availableCharacters.map(c => ({
                label: c.name,
                value: c.id
              }))}
            />
          </Form.Item>

          <Form.Item
            name="position"
            label={t('organizations.position')}
            rules={[{ required: true, message: t('organizations.positionRequired') }]}
          >
            <Input placeholder={t('organizations.positionPlaceholder')} />
          </Form.Item>

          <Form.Item
            name="rank"
            label={t('organizations.positionRank')}
            initialValue={5}
            tooltip={t('organizations.rankTooltip')}
          >
            <InputNumber min={0} max={10} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="loyalty"
            label={t('organizations.initialLoyalty')}
            initialValue={50}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" />
          </Form.Item>

          <Form.Item
            name="status"
            label={t('organizations.status')}
            initialValue="active"
          >
            <Select>
              <Select.Option value="active">{t('organizations.statusActive')}</Select.Option>
              <Select.Option value="retired">{t('organizations.statusRetired')}</Select.Option>
              <Select.Option value="expelled">{t('organizations.statusExpelled')}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="joined_at"
            label={t('organizations.joinedAt')}
          >
            <Input placeholder={t('organizations.joinedAtPlaceholder')} />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsAddMemberModalOpen(false)}>{t('organizations.cancel')}</Button>
              <Button type="primary" htmlType="submit">
                {t('organizations.add')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑成员模态框 */}
      <Modal
        title={t('organizations.editMemberTitle')}
        open={isEditMemberModalOpen}
        onCancel={() => {
          setIsEditMemberModalOpen(false);
          editMemberForm.resetFields();
          setEditingMember(null);
        }}
        footer={null}
        centered={true}
        width={isMobile ? '90%' : 500}
        style={isMobile ? {
          maxWidth: '90vw',
          margin: '0 auto'
        } : undefined}
        styles={isMobile ? {
          body: {
            maxHeight: 'calc(80vh - 110px)',
            overflowY: 'auto',
            padding: '20px 16px'
          }
        } : undefined}
      >
        <Form
          form={editMemberForm}
          layout="vertical"
          onFinish={handleUpdateMember}
        >
          <Form.Item
            name="position"
            label={t('organizations.position')}
            rules={[{ required: true, message: t('organizations.positionRequired') }]}
          >
            <Input placeholder={t('organizations.positionPlaceholder')} />
          </Form.Item>

          <Form.Item
            name="rank"
            label={t('organizations.positionRank')}
            tooltip={t('organizations.rankTooltip')}
          >
            <InputNumber min={0} max={10} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="loyalty"
            label={t('organizations.loyalty')}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" />
          </Form.Item>

          <Form.Item
            name="contribution"
            label={t('organizations.contribution')}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" />
          </Form.Item>

          <Form.Item
            name="status"
            label={t('organizations.status')}
          >
            <Select>
              <Select.Option value="active">{t('organizations.statusActive')}</Select.Option>
              <Select.Option value="retired">{t('organizations.statusRetired')}</Select.Option>
              <Select.Option value="expelled">{t('organizations.statusExpelled')}</Select.Option>
              <Select.Option value="deceased">{t('organizations.statusDeceased')}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="joined_at"
            label={t('organizations.joinedAt')}
          >
            <Input placeholder={t('organizations.joinedAtPlaceholder')} />
          </Form.Item>

          <Form.Item
            name="notes"
            label={t('organizations.notes')}
          >
            <Input.TextArea rows={3} placeholder={t('organizations.notesPlaceholder')} />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => {
                setIsEditMemberModalOpen(false);
                editMemberForm.resetFields();
                setEditingMember(null);
              }}>
                {t('organizations.cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('organizations.save')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑组织模态框 */}
      <Modal
        title={t('organizations.editOrgTitle')}
        open={isEditOrgModalOpen}
        onCancel={() => {
          setIsEditOrgModalOpen(false);
          editOrgForm.resetFields();
        }}
        footer={null}
        centered={!isMobile}
        width={isMobile ? '100%' : 500}
        style={isMobile ? { top: 0, paddingBottom: 0, maxWidth: '100vw' } : undefined}
        styles={isMobile ? { body: { maxHeight: 'calc(100vh - 110px)', overflowY: 'auto' } } : undefined}
      >
        <Form
          form={editOrgForm}
          layout="vertical"
          onFinish={async (values) => {
            if (!selectedOrg) return;
            try {
              await axios.put(`/api/organizations/${selectedOrg.id}`, values);
              message.success(t('organizations.orgUpdateSuccess'));
              setIsEditOrgModalOpen(false);
              editOrgForm.resetFields();

              // 重新获取更新后的组织列表
              const res = await axios.get(`/api/organizations/project/${projectId}`);
              setOrganizations(res.data);

              // 更新当前选中的组织详情
              const updatedOrg = res.data.find((org: Organization) => org.id === selectedOrg.id);
              if (updatedOrg) {
                setSelectedOrg(updatedOrg);
              }

              // 刷新全局 store
              await refreshCharacters();
            } catch (error) {
              message.error(t('organizations.updateFailed'));
              console.error(error);
            }
          }}
        >
          <Form.Item
            name="power_level"
            label={t('organizations.powerLevel')}
            rules={[{ required: true, message: t('organizations.powerLevelRequired') }]}
            tooltip={t('organizations.powerLevelTooltip')}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="location"
            label={t('organizations.location')}
          >
            <Input placeholder={t('organizations.locationPlaceholder')} />
          </Form.Item>

          <Form.Item
            name="motto"
            label={t('organizations.motto')}
          >
            <Input placeholder={t('organizations.mottoPlaceholder')} />
          </Form.Item>

          <Form.Item
            name="color"
            label={t('organizations.color')}
          >
            <Input placeholder={t('organizations.colorPlaceholder')} />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsEditOrgModalOpen(false)}>{t('organizations.cancel')}</Button>
              <Button type="primary" htmlType="submit">
                {t('organizations.save')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
