import {
  DatePicker,
  Form,
  FormInstance,
  FormRule,
  Input,
  Modal,
  ModalProps,
  notification,
  Select,
  Space,
  TimePicker,
} from 'antd';
import moment from 'moment';
import React from 'react';
import {
  Agenda,
  AgendaFormValues,
  AgendaStatus,
  CreateAgendaPayload,
  UpdateAgendaPayload,
} from '../models';
import { formToModel, getStatusLabel, modelToForm } from '../utils';

const { Option } = Select;

interface UpsertAgendaModalProps extends Omit<ModalProps, 'onOk'> {
  handleCreate(payload: CreateAgendaPayload): void;
  handleUpdate(payload: UpdateAgendaPayload): void;
  initialValues?: Agenda;
}

const defaultAgenda: Agenda = {
  id: '',
  title: '',
  description: '',
  status: AgendaStatus.IN_COMING,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
};

export const UpsertAgendaModal = ({
  handleCreate,
  handleUpdate,
  initialValues = defaultAgenda,
  ...modalProps
}: UpsertAgendaModalProps) => {
  const formRef = React.useRef<FormInstance<AgendaFormValues>>(null);
  const isCreate = initialValues.id === '';
  const initialFormValues = modelToForm(initialValues);

  const timeRangeConstraint: FormRule = {
    message: 'Start Time must be less than End Time',
    validator() {
      const formValues = formRef.current?.getFieldsValue()!;
      const model = formToModel(formValues);
      const isBefore = moment(model.startTime).isSameOrBefore(model.endTime);
      if (!isBefore) {
        throw new Error('Start Time must be less than End Time');
      }
      return Promise.resolve(true);
    },
  };

  const handleSubmit = async () => {
    try {
      const formValues = await formRef.current?.validateFields()!;
      const model = formToModel(formValues);

      if (isCreate) {
        handleCreate(model);
        return;
      }

      handleUpdate(model);
    } catch (error: any) {
      notification.error({
        message: 'Error happened when saving agenda.',
        description: error.message
      })
    }
  };

  return (
    <Modal {...modalProps} onOk={handleSubmit}>
      <Form layout="vertical" ref={formRef} initialValues={initialFormValues}>
        <Form.Item
          label="Title"
          name="title"
          required
          rules={[
            {
              required: true,
              message: 'Title can not be empty.',
            },
            {
              min: 8,
              message: 'Title must be more than or equal 8 characters.',
            },
            {
              max: 255,
              message: 'Title must be less than or equal 255 characters.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Status" name="status" required>
          <Select defaultValue={AgendaStatus.IN_COMING} allowClear={false}>
            {Object.values(AgendaStatus).map((op) => (
              <Option key={op} value={op}>
                {getStatusLabel(op)}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Start Time" required>
          <Space>
            <Form.Item name="startDate" required rules={[timeRangeConstraint]}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="startTime" required rules={[timeRangeConstraint]} >
              <TimePicker showSecond={false} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="End Time" required>
          <Space>
            <Form.Item name="endDate" required rules={[timeRangeConstraint]} >
              <DatePicker />
            </Form.Item>
            <Form.Item name="endTime" required rules={[timeRangeConstraint]} >
              <TimePicker showSecond={false} />
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
