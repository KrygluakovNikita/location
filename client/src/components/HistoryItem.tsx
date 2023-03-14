import React, { FC } from 'react';
import styles from './HistoryItem.module.css';

interface IHistoryItem {
  id: string;
  date: Date;
  // time:string//////fix here
}

export const HistoryItem: FC<IHistoryItem> = ({ id, date }) => {
  return (
    <div key={id} className={styles.mainContainer}>
      <div className={styles.historyItemIdContainer}>
        <p>ID </p>
        <p className={styles.redText}>{id}</p>
      </div>
      <div className={styles.historyItemDateContainer}>
        <p>{date.toString()}</p>
      </div>
    </div>
  );
};
