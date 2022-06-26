import {
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, notification, PageHeader, Pagination, Row, Space } from 'antd';
import * as React from 'react';
import { AgendaList } from '../components/AgendaList';
import { ConfirmDeleteAgendaModal } from '../components/ConfirmDeleteAgendaModal';
import { Agenda } from '../models';
import { useAgendaList, useDeleteAgenda } from '../queries';

export const ListAgenda = () => {
  const [currentAgenda, setCurrentAgenda] = React.useState<Agenda | null>(null);
  const [showUpsertModal, setShowUpsertModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [pagination, setPagination] = React.useState<{
    page: number;
    perPage: number;
  }>({ page: 1, perPage: 10 });
  const { data, isLoading, refetch, isRefetching } = useAgendaList(pagination);
  const { mutateAsync: deleteAgenda, isLoading: isDeleting } =
    useDeleteAgenda();

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

  return (
    <>
      <Space
        direction="vertical"
        style={{
          maxWidth: '80%',
          display: 'flex',
          margin: '0 auto',
          padding: 16,
        }}
      >
        <PageHeader
          title="Agenda"
          subTitle="A page for agenda management operation"
        />
        <Row justify="end">
          <Space>
            <Button icon={<ImportOutlined />}>Import</Button>
            <Button
              icon={<ExportOutlined />}
              disabled={data?.data.length === 0}
            >
              Export
            </Button>
            <Button icon={<PlusOutlined />} type="primary">
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
      </Space>
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
        >
          {`Are you sure to delete agenda ${currentAgenda.title} ?`}
        </ConfirmDeleteAgendaModal>
      )}
    </>
  );
};
