import React, { FC, useState } from 'react';
import styles from './ChangeValueItem.module.css';
import Pencil from '../images/Pencil.svg';

interface IChangeValueItem {
  title: string;
  value: string;
  onChange: (val: any) => void;
}

export const ChangeValueItem: FC<IChangeValueItem> = ({ title, value, onChange }) => {
  const [newValue, setNewValue] = useState('');
  const [isChange, setIsChange] = useState(false);
  const changeHandler = (newVal: string) => {
    if (newVal && newVal !== value) {
      setIsChange(true);
      setNewValue(newVal);
    } else {
      setIsChange(false);
      setNewValue(value);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.changeValueTitle}>{title}</div>
      <div className={styles.changeValueBtn}>
        <div className={styles.changeValueBtn}>
          <div className={styles.changeValueBtnValue}>
            <input
              type='text'
              className={styles.changeValueBtnText}
              onChange={event => changeHandler(event.target.value)}
              value={newValue ? newValue : value}></input>
          </div>
          <div className={styles.changeValueBtnPencil}>
            {isChange ? <img src={Pencil} alt='edit' onClick={onChange} className={styles.cursorPointer} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
