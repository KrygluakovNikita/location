import React, { FC } from 'react';
import styles from './Modal.module.css';
interface IModal {
  setIsOpen: (val: boolean) => void;
  title: string;
}

const Modal: FC<IModal> = ({ setIsOpen, title }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>{title}</div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.okBtn} onClick={() => setIsOpen(false)}>
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
