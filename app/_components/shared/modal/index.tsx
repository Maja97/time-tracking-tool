import { Dialog } from 'primereact/dialog';
import Button from '../button';
import styles from './index.module.scss';

interface Props {
  title: string;
  isOpen: boolean;
  content?: string;
  itemId?: string;
  closeModal: () => void;
  action: (id?: string) => void;
}

function Modal({ title, isOpen, itemId, content, closeModal, action }: Props) {
  const footerContent = (
    <div className={styles.actions}>
      <Button onClick={closeModal} className="p-button-text">
        No
      </Button>
      <Button onClick={() => action(itemId)}>Yes</Button>
    </div>
  );

  return (
    <Dialog
      header={title}
      visible={isOpen}
      onHide={closeModal}
      footer={footerContent}
      className={styles.modal}
      draggable={false}
      resizable={false}>
      <p className={styles.content}>{content}</p>
    </Dialog>
  );
}

export default Modal;
