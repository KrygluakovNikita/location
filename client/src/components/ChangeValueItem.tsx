import React, { FC, useState } from 'react';
import styles from './ChangeValueItem.module.css';
import Pencil from '../images/Pencil.svg';

interface IChangeValueItem {
  title: string;
  placeHolder: string;
  onChange: (val: any) => void;
}

export const ChangeValueItem: FC<IChangeValueItem> = ({ title, onChange, placeHolder }) => {
  const [newValue, setNewValue] = useState('');
  const [isChange, setIsChange] = useState(false);

  const changeHandler = (newVal: string) => {
    if (newVal) {
      setIsChange(true);
      setNewValue(newVal);
    } else {
      setIsChange(false);
      setNewValue('');
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
              placeholder={placeHolder ?? ''}
              className={styles.changeValueBtnText}
              onChange={event => changeHandler(event.target.value)}
              value={newValue}
            />
          </div>
          <div className={styles.changeValueBtnPencil}>
            {isChange ? <img src={Pencil} alt='edit' onClick={() => onChange(newValue)} className={styles.cursorPointer} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
