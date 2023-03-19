import React, { FC } from 'react';
import styles from './Modal.module.css';
interface IModal {
  setIsOpen: (val: boolean) => void;
  title: string;
  text: string;
}

const Modal: FC<IModal> = ({ setIsOpen, title, text }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>{title}</div>
          {text ? <div className={styles.modalContent}>{text}</div> : null}
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
