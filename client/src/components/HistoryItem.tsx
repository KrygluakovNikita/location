import React, { FC } from 'react';
import styles from './HistoryItem.module.css';
import moment from 'moment';
interface IHistoryItem {
  id: string;
  date: Date;
  gameDate: Date;
  // time:string//////fix here
}

export const HistoryItem: FC<IHistoryItem> = ({ id, date, gameDate }) => {
  return (
    <div key={id} className={styles.mainContainer}>
      <div className={styles.historyItemIdContainer}>
        <p>ID </p>
        <p className={styles.redText}>{id}</p>
      </div>
      <div className={styles.historyItemDateContainer}>
        <p>Дата создания</p>
        <p>{moment(date).format('DD.MM.YYYY HH:mm')}</p>
      </div>
      <div className={styles.historyItemDateContainer}>
        <p>Дата аренды</p>
        <p>{moment(gameDate).format('DD.MM.YYYY HH:mm')}</p>
      </div>
    </div>
  );
};
