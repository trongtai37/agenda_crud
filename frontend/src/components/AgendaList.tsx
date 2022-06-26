import { Button, Space, Table, TableProps, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';
import { Agenda, AgendaStatus } from '../models';

interface AgendaListProps extends TableProps<Agenda> {
  handleUpdateRow(row: Agenda): void;
  handleDeleteRow(row: Agenda): void;
}

const renderStatus = (value: AgendaStatus) => {
  switch (value) {
    case AgendaStatus.IN_COMING:
      return <Tag color="cyan">In Coming</Tag>;
    case AgendaStatus.IN_PROGRESS:
      return <Tag color="processing">In Progress</Tag>;
    case AgendaStatus.ARCHIVED:
      return <Tag>Archived</Tag>;
    default:
      return null;
  }
};

export const AgendaList = ({
  handleUpdateRow,
  handleDeleteRow,
  ...remainProps
}: AgendaListProps) => {
  const columns = [
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
      render(value, record) {
        return (
          <Button type="link" onClick={() => handleUpdateRow(record)}>
            {value}
          </Button>
        );
      },
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: renderStatus,
    },
    {
      key: 'startTime',
      title: 'Start Time',
      dataIndex: 'startTime',
      render: (value: string) => moment(value).format('YYYY-MM-DD HH:mm'),
    },
    {
      key: 'endTime',
      title: 'End Time',
      dataIndex: 'endTime',
      render: (value: string) => moment(value).format('YYYY-MM-DD HH:mm'),
    },
    {
      key: 'action-buttons',
      title: 'Actions',
      render(_, record: Agenda) {
        return (
          <Space>
            <Button onClick={() => handleUpdateRow(record)}>Update</Button>
            <Button onClick={() => handleDeleteRow(record)} danger>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ] as ColumnType<Agenda>[];

  return <Table {...remainProps} columns={columns} />;
};
