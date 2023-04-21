import { useEffect, useState } from 'react';
import { ChangeValueItem } from '../../components/ChangeValueItem';
import { Sidebar } from '../../components/Sidebar';
import { useAppSelector } from '../../hooks/redux';
import { useGetGamesQuery } from '../../store/api/GameApi';
import { GameDto } from '../../store/reducers/UserSlice';
import styles from './AdminProfileSettings.module.css';
import { HistoryAdminItem } from '../../components/HistoryAdminItem';
import { useUpdateUserDataMutation } from '../../store/api/UserApi';
import { useNavigate } from 'react-router-dom';
import { useGetEquipmentsQuery } from '../../store/api/EquipmentApi';

export const AdminProfileSettings = () => {
  const navigator = useNavigate();
  const user = useAppSelector(state => state.user);
  const { data, isSuccess } = useGetGamesQuery();
  const [games, setGames] = useState<GameDto[] | null>(null);
  const [updateUserData] = useUpdateUserDataMutation();
  const { data: equipments = [] } = useGetEquipmentsQuery();
  const changeEmailHanlder = (newEmail: string) => {
    updateUserData({ newEmail });
  };
  const changePasswordHanlder = (newPassword: string) => {
    updateUserData({ newPassword });
  };
  const changeCityHanlder = (newCity: string) => {
    updateUserData({ newCity });
  };

  useEffect(() => {
    if (data) setGames(data);
  }, [data, isSuccess]);

  const redirectHanlder = () => {
    navigator('/admin/profile/game-stat');
  };

  const createNewEquipmentHanlder = () => {
    navigator('/admin/add-equipment');
  };

  return (
    <div>
      <Sidebar isProfile={true} />
      <div className={styles.wrapContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.historyContainer}>
            <div className={styles.paddingContainer}>
              <div className={styles.profileHistoryText}>
                <p className={styles.redText}>История игр</p>
                <p onClick={redirectHanlder} className={styles.searchStat}>
                  Поиск в диапазоне
                </p>
              </div>
              <table className={styles.profileHistoryItems}>
                <tr className={styles.historyItemIdContainer}>
                  <td>ID</td>
                  <td>Дата игры</td>
                  <td>Дата создания</td>
                  <td>Оплата</td>
                  <td></td>
                  <td>Email</td>
                </tr>
                {games?.map(game => (
                  <HistoryAdminItem game={game} />
                ))}
              </table>
            </div>
          </div>
          <div className={styles.rightSideContainer}>
            <div className={styles.userDataContainer}>
              <ChangeValueItem title='Email' placeHolder={user.email} onChange={changeEmailHanlder} />
              <ChangeValueItem title='Пароль' placeHolder='********' onChange={changePasswordHanlder} />
              <ChangeValueItem title='Город' placeHolder={user.city} onChange={changeCityHanlder} />
            </div>
            <div className={styles.userDataContainer}>
              <div className={styles.addButton}>
                <button onClick={createNewEquipmentHanlder}>Добавить оборудование</button>
              </div>
              {equipments.map(equipment => {
                return (
                  <div>
                    <h1>{equipment.title}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
