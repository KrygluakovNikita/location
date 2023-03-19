import React, { FC, useState, useEffect } from 'react';
import styles from './HistoryAdminItem.module.css';
import moment from 'moment';
import { useUpdatePayByGameIdMutation } from '../store/api/GameApi';
interface IHistoryItem {
  // id: string;
  // date: Date;
  // // time:string//////fix here
  game: any;
}

export const HistoryAdminItem: FC<IHistoryItem> = ({ game }) => {
  console.log(game);
  const [isPayed, setIsPayed] = useState(false);
  const [updatePayGame] = useUpdatePayByGameIdMutation();
  useEffect(() => {
    if (game) {
      setIsPayed(game.isPayed);
    }
  }, [game]);

  const payHandler = () => {
    setIsPayed(prevState => !prevState);
    updatePayGame({ gameId: game.gameId, isPayed: !isPayed });
  };
  return (
    <tr className={styles.historyItemIdContainer}>
      <td>
        <tr>
          <td>
            <p>ID </p>
          </td>
          <td>
            <p className={styles.redText}>{game.gameId}</p>
          </td>
        </tr>
      </td>
      <td>
        {moment(game.date).format('DD.MM.YYYY HH:mm')}-
        {moment(game.date)
          .add(+game.hours ?? 0, 'hours')
          .format('HH:mm')}
      </td>
      <td>{game.paymentType === 'cash' ? 'наличные' : 'карта'}</td>
      <td>
        <tr>
          <td>
            <input type='checkbox' id='checkbox_id' className={styles.adminProfileCheckbox} checked={isPayed} onChange={payHandler} />
          </td>
          <td>
            <p className={styles.profileQRCodeIdText}>Оплачено </p>
          </td>
        </tr>
      </td>
      <td>
        <p className={styles.redText}>{game.gameId}</p>
      </td>
      <td>
        <p className={styles.redText}>{game.user.email} </p>
      </td>
    </tr>
  );
};

////сделать редактирование поста
////сделать модальное окно для ввода ерип кода для оплаты
/////пофиксить чекбокс на регистрации
