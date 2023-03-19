import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { useGetGamesStatMutation } from '../../store/api/GameApi';
import { GameDto } from '../../store/reducers/UserSlice';
import styles from './AdminProfileGameStat.module.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const AdminProfileGameStat = () => {
  const [getStat, { data, isSuccess }] = useGetGamesStatMutation();
  const [games, setGames] = useState<GameDto[] | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (data?.games.length) setGames(data.games);
    if (data?.count) setCount(data.count);
  }, [data, isSuccess]);

  const clickHandler = async () => {
    console.log('clicked');

    if (startDate && endDate) {
      await getStat({ startDate, endDate })
        .unwrap()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <Sidebar isProfile={true} />
      <div className={styles.wrapContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.inputsContainer}>
            <div className=''>
              <p>Начало</p>
              <input
                className={styles.smallContainer}
                type='date'
                onChange={e => {
                  setEndDate(new Date(e.currentTarget.value));
                }}
                value={endDate?.toISOString().substring(0, 10) ?? ''}
                placeholder='Дата конца'
              />
            </div>
            <div className=''>
              <p>Конец</p>
              <input
                className={styles.smallContainer}
                type='date'
                onChange={e => {
                  setStartDate(new Date(e.currentTarget.value));
                }}
                value={startDate?.toISOString().substring(0, 10) ?? ''}
                placeholder='Дата начала'
              />
            </div>
            <div>
              <button className={styles.btnStatContainer} onClick={clickHandler}>
                <p className={styles.btnTextStat}>Найти</p>
              </button>
            </div>
          </div>
          <div className={styles.historyContainer}>
            <div className={styles.paddingContainer}>
              <div className={styles.profileHistoryText}>
                <p className={styles.redText}>Поиск в диапазоне {` ${count ? `Нашлось (${count})` : ''}`}</p>
              </div>
              <table className={styles.profileHistoryItems}>
                <thead>
                  <tr className={styles.historyItemIdContainer}>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>Payment Type</th>
                    <th>Is Paid</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {games?.map(game => (
                    <tr key={game.gameId} className={styles.historyItemIdContainer}>
                      <td>{game.gameId}</td>
                      <td>{moment(game.date).format('DD-MM-YYYY')}</td>
                      <td>{game.hours}</td>
                      <td>{game.paymentType}</td>
                      <td>{game.isPayed ? 'Yes' : 'No'}</td>
                      <td>{game.user.userId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
