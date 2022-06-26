import {
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, notification, PageHeader, Pagination, Row, Space } from 'antd';
import * as React from 'react';
import { AgendaList } from '../components/AgendaList';
import { ConfirmDeleteAgendaModal } from '../components/ConfirmDeleteAgendaModal';
import { ImportAgendaModal } from '../components/ImportAgendaModal';
import { PageContainer } from '../components/PageContainer';
import { UpsertAgendaModal } from '../components/UpsertAgendaModal';
import { API_BASE_URL } from '../constants';
import { Agenda, CreateAgendaPayload, UpdateAgendaPayload } from '../models';
import {
  useAgendaList,
  useCreateAgenda,
  useDeleteAgenda,
  useUpdateAgenda,
} from '../queries';

export const ListAgenda = () => {
  const [currentAgenda, setCurrentAgenda] = React.useState<Agenda | null>(null);
  const [showUpsertModal, setShowUpsertModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [pagination, setPagination] = React.useState<{
    page: number;
    perPage: number;
  }>({ page: 1, perPage: 10 });
  const { data, isLoading, refetch, isRefetching } = useAgendaList(pagination);
  const { mutateAsync: deleteAgenda, isLoading: isDeleting } =
    useDeleteAgenda();
  const { mutateAsync: updateAgenda, isLoading: isUpdating } =
    useUpdateAgenda();
  const { mutateAsync: createAgenda, isLoading: isCreating } =
    useCreateAgenda();

  const onClickCreate = () => {
    setCurrentAgenda(null);
    setShowUpsertModal(true);
  };

  const onClickUpdate = (agenda: Agenda) => {
    setCurrentAgenda(agenda);
    setShowUpsertModal(true);
  };

  const onClickDelete = (agenda: Agenda) => {
    setCurrentAgenda(agenda);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      if (!currentAgenda) return;
      await deleteAgenda(currentAgenda.id);
      notification.success({
        message: 'Delete agenda successfully!',
      });
      refetch();
    } catch (error: any) {
      notification.error({
        message: `Failed to delete agenda: ${error.message}`,
      });
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleCreate = async (payload: CreateAgendaPayload) => {
    try {
      if (currentAgenda) return;
      await createAgenda(payload);
      notification.success({
        message: 'Create agenda successfully!',
      });
      refetch();
    } catch (error: any) {
      notification.error({
        message: `Failed to create agenda: ${error.message}`,
      });
    } finally {
      setShowUpsertModal(false);
    }
  };

  const handleUpdate = async (payload: UpdateAgendaPayload) => {
    try {
      if (!currentAgenda) return;
      await updateAgenda({ id: currentAgenda.id, payload });
      notification.success({
        message: 'Update agenda successfully!',
      });
      refetch();
    } catch (error: any) {
      notification.error({
        message: `Failed to update agenda: ${error.message}`,
      });
    } finally {
      setShowUpsertModal(false);
    }
  };

  return (
    <>
      <PageContainer
      >
        <PageHeader
          title="Agenda Management"
          subTitle="A page for agenda management operations"
        />
        <Row justify="end">
          <Space>
            <Button
              icon={<ImportOutlined />}
              onClick={() => setShowImportModal(true)}
            >
              Import
            </Button>
            <Button
              icon={<ExportOutlined />}
              disabled={data?.data.length === 0}
              href={`${API_BASE_URL}/agenda/export`}
            >
              Export
            </Button>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={onClickCreate}
            >
              Create
            </Button>
          </Space>
        </Row>
        <AgendaList
          loading={isLoading || isRefetching}
          dataSource={data?.data}
          handleUpdateRow={onClickUpdate}
          handleDeleteRow={onClickDelete}
          pagination={false}
        />
        <Row justify="end">
          <Pagination
            pageSize={pagination.perPage}
            current={pagination.page}
            total={data?.total}
            showSizeChanger
            showTotal={(total) => `Total ${total} items`}
            onChange={(page, pageSize) => {
              setPagination({ page, perPage: pageSize });
            }}
          />
        </Row>
      </PageContainer>
      {currentAgenda && (
        <ConfirmDeleteAgendaModal
          title="Confirm Delete"
          visible={showDeleteModal}
          okButtonProps={{ danger: true }}
          onCancel={() => {
            setCurrentAgenda(null);
            setShowDeleteModal(false);
          }}
          confirmLoading={isDeleting}
          onOk={handleDelete}
          destroyOnClose
        >
          {`Are you sure to delete agenda ${currentAgenda.title} ?`}
        </ConfirmDeleteAgendaModal>
      )}
      <UpsertAgendaModal
        visible={showUpsertModal}
        confirmLoading={isCreating || isUpdating}
        title={currentAgenda ? 'Update Agenda' : 'Create Agenda'}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        onCancel={() => setShowUpsertModal(false)}
        destroyOnClose
        okText="Submit"
        initialValues={currentAgenda ?? undefined}
      />
      <ImportAgendaModal
        title="Import Agendas"
        visible={showImportModal}
        onCancel={() => setShowImportModal(false)}
        destroyOnClose
        setShowImportModal={setShowImportModal}
      />
    </>
  );
};
