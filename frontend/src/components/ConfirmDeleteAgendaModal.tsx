import { Modal, ModalProps } from 'antd';

interface ConfirmDeleteAgendaModalProps extends ModalProps {}

export const ConfirmDeleteAgendaModal = (
  props: ConfirmDeleteAgendaModalProps,
) => {
  return <Modal {...props} />;
};
