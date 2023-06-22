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
import { EquipmentDto, useGetEquipmentsQuery } from '../../store/api/EquipmentApi';
import { useDeleteByIdMutation } from '../../store/api/EquipmentApi';

export const AdminProfileSettings = () => {
  const navigator = useNavigate();
  const user = useAppSelector(state => state.user);
  const { data, isSuccess } = useGetGamesQuery();
  const [games, setGames] = useState<GameDto[] | null>(null);
  const [updateUserData] = useUpdateUserDataMutation();
  const [deleteEquipmentById] = useDeleteByIdMutation();
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

  const redirectHanlderStat = () => {
    navigator('/admin/profile/game-stat');
  };
  const redirectHanlderDiagram = () => {
    navigator('/admin/profile/diagram');
  };

  const createNewEquipmentHanlder = () => {
    navigator('/admin/add-equipment');
  };

  const deleteEquipmentHandler = async (equipmentId: string) => {
    await deleteEquipmentById(equipmentId);
  };
  const changeEquipmentHandler = async (equipmentId: string) => {
    navigator(`/admin/add-equipment/${equipmentId}`);
  };

  const equipmentItem = (equipment: EquipmentDto) => {
    return (
      <tr className={styles.historyItemIdContainer}>
        <td>{equipment.equipmentId}</td>
        <td>{equipment.title}</td>
        <td>{equipment.description}</td>
        <td>{equipment.count}</td>
        <td>{equipment.price}</td>
        <td>
          <div className={styles.deleteButton}>
            <button onClick={() => deleteEquipmentHandler(equipment.equipmentId)}>Удалить</button>
          </div>
        </td>
        <td>
          <div className={styles.deleteButton}>
            <button onClick={() => changeEquipmentHandler(equipment.equipmentId)}>Редактировать</button>
          </div>
        </td>
      </tr>
    );
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
                <p onClick={redirectHanlderStat} className={styles.searchStat}>
                  Поиск в диапазоне
                </p>
                <p onClick={redirectHanlderDiagram} className={styles.searchStat}>
                  Диаграмма
                </p>
              </div>
              <table className={styles.profileHistoryItems}>
                <tr className={styles.historyItemIdContainer}>
                  <td>ID</td>
                  <td>Дата аренды</td>
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
            <div className={styles.equipmentContainer}>
              <div className={styles.addButton}>
                <button onClick={createNewEquipmentHanlder}>Добавить оборудование</button>
              </div>
              <div>
                <table className={styles.profileHistoryItems}>
                  <tr className={styles.historyItemIdContainer}>
                    <td style={{ paddingRight: 10 }}>ID</td>
                    <td style={{ paddingRight: 10 }}>Название</td>
                    <td style={{ paddingRight: 10 }}>Описание</td>
                    <td style={{ paddingRight: 10 }}>Количество</td>
                    <td style={{ paddingRight: 10}}>Цена(бел.руб)</td>
                    <td></td>
                    <td></td>
                  </tr>
                  {equipments.map(equipment => equipmentItem(equipment))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
