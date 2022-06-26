import { InboxOutlined } from '@ant-design/icons';
import {
  Alert, Form,
  FormInstance,
  Modal,
  ModalProps,
  notification,
  Space,
  Typography,
  Upload
} from 'antd';
import Papaparse from 'papaparse';
import React from 'react';
import { useQueryClient } from 'react-query';
import { CreateAgendaPayload } from '../models';
import { useCreateManyAgendas } from '../queries';

const readImportRecords = (file: File): Promise<CreateAgendaPayload[]> => {
  return new Promise((resolve, reject) => {
    Papaparse.parse(file, {
      header: true,
      complete(results) {
        resolve(results.data as CreateAgendaPayload[]);
      },
      error(error) {
        reject(error);
      },
    });
  });
};

interface ImportAgendaModalProps extends ModalProps {
  setShowImportModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImportAgendaModal = ({
  setShowImportModal,
  ...remainProps
}: ImportAgendaModalProps) => {
  const formRef = React.useRef<FormInstance<{ files: any }>>(null);
  const { isLoading: isImporting, mutateAsync: createManyAgendas } =
    useCreateManyAgendas();
  const queryClient = useQueryClient();

  const handleImport = async () => {
    const formValues = await formRef.current?.validateFields();

    try {
      const [file] = formValues?.files!;
      const agendas = await readImportRecords(file.originFileObj);
      await createManyAgendas(agendas);
      notification.success({
        message: `Import agenda successfully!.`,
        description: `${agendas.length} agenda(s) imported.`
      });
      queryClient.invalidateQueries(['agendas'])
    } catch (error: any) {
      notification.error({
        message: 'Error happened when importing agendas.',
        description: error.message
      });
    }
    finally {
      setShowImportModal(false);
    }
  };

  return (
    <Modal {...remainProps} onOk={handleImport} confirmLoading={isImporting}>
      <Space direction="vertical" style={{ marginTop: 16 }}>
        <Form layout="vertical" ref={formRef}>
          <Form.Item label="File">
            <Form.Item
              name="files"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please add a file.',
                },
              ]}
            >
              <Upload.Dragger
                name="files"
                beforeUpload={() => false}
                multiple={false}
                maxCount={1}
                accept=".csv"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Form>
        <Alert
          message="Notes"
          description={
            <Typography.Text>
              You should upload file with <code>.csv</code> extension, download
              a sample <a href='/import_sample.csv' download>here</a>.
            </Typography.Text>
          }
          type="info"
          showIcon
        />
      </Space>
    </Modal>
  );
};
