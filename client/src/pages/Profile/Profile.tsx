import { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { useAppSelector } from '../../hooks/redux';
import styles from './Profile.module.css';
import { Settings } from '../../images/Settings';
import { useAddGameMutation } from '../../store/api/GameApi';
import { GameDto, PaymentType } from '../../store/reducers/UserSlice';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import moment from 'moment';
import { EquipmentDto, useGetByDateMutation } from '../../store/api/EquipmentApi';

export const Profile = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);
  const [addGame] = useAddGameMutation();
  const [hours, setHours] = useState<null | string>(null);
  const [payType, setPayType] = useState<null | PaymentType>(null);
  const [playDate, setPlayDate] = useState<null | string>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [equipments, setEquipments] = useState<EquipmentDto[] | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentDto | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [getEquipmentByDate] = useGetByDateMutation();

  const createGame = async () => {
    if (hours && payType && playDate && selectedEquipment) {
      await addGame({ hours, paymentType: payType, date: new Date(playDate), equipmentId: selectedEquipment.equipmentId })
        .unwrap()
        .then((res: GameDto) => {
          setGameId(res.gameId);
          setIsOpen(true);
        })
        .catch(err => alert(err.data.message));
    }
  };

  const onClickModal = (state: boolean) => {
    setIsOpen(state);
    navigate(`/profile/${gameId}`);
    setHours(null);
    setPayType(null);
    setPlayDate(null);
  };

  const getMoreEquipmentHandler = async () => {
    const result = await getEquipmentByDate({ date: new Date(playDate!) }).unwrap();

    setEquipments(result);
  };

  useEffect(() => {
    if (playDate) {
      getMoreEquipmentHandler();
    }
  }, [playDate]);

  return (
    <div className=''>
      <Sidebar isProfile={true} />
      <div className={styles.mainContainer}>
        <div className={styles.secondContainer}>
          <div className={styles.sideContainer}></div>
          <div className={styles.cartContainer}>
            <div className={styles.profilePhotoContainer}>
              <img className={styles.profileImg} src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + user.photo} alt='' />
              <div className={styles.profileUserData}>
                <p className={styles.profileUserName}>{user.nickname}</p>
                <p className={styles.profileUserCity}>{user.city}</p>
              </div>
            </div>
            {isOpen ? (
              <Modal
                setIsOpen={onClickModal}
                title='Игра успешно создана'
                text={payType === PaymentType.CARD ? 'Оплата по ЕРИП AlfaBank BY59ALFA301430KLLT0070270000' : 'Оплата наличными'}
              />
            ) : (
              <div className={styles.profileScanContainer}>
                <div className={styles.profileSelectMainContainer}>
                  <select
                    className={styles.selectContainer}
                    onChange={event => {
                      setHours(event.currentTarget.value);
                    }}
                    defaultValue={''}>
                    <option value='' disabled>
                      Время игры
                    </option>
                    <option value='1'>1 час</option>
                    <option value='2'>2 часа</option>
                    <option value='4'>4 часа</option>
                  </select>
                </div>
                <div className={styles.profileSelectDate}>
                  <input
                    type='datetime-local'
                    onChange={e => {
                      if (moment(e.currentTarget.value) >= moment()) {
                        setPlayDate(e.currentTarget.value);
                      }
                    }}
                    className={styles.profileDateTimeContainer}
                    value={playDate ?? ''}
                  />
                </div>
                <div className={styles.profileSelectPayTypeMainContainer}>
                  <select
                    className={styles.selectContainer}
                    onChange={event => {
                      setPayType(event.currentTarget.value as PaymentType);
                    }}
                    defaultValue={''}>
                    <option value='' disabled>
                      Тип оплаты
                    </option>
                    <option value='cash'>Наличные</option>
                    <option value='card'>Карта</option>
                  </select>
                </div>
                <div className={styles.profileSelectEquipmentMainContainer}>
                  <select
                    className={styles.selectContainer}
                    onChange={event => {
                      setSelectedEquipment(JSON.parse(event.currentTarget.value));
                    }}
                    defaultValue={''}>
                    <option value='' disabled>
                      Лазертаг оборудование
                    </option>
                    {equipments
                      ? equipments.map(equipment => (
                          <option value={JSON.stringify(equipment)} key={equipment.equipmentId}>
                            {equipment.title}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div className={styles.profileGenerateQRBtnContainer}>
                  <button
                    className={hours && payType && playDate ? styles.profileGenerateQRBtn : styles.profileGenerateQRBtnContainerDisabled}
                    onClick={createGame}>
                    <p className={styles.profileGenerateQRBtnText}>Сгенерировать QR код</p>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.sideContainer}>
            <button className={styles.profileSettingContainer} onClick={() => navigate('/profile/settings')}>
              <Settings color={'white'} />
              <p className={styles.profileSettingText}>Настройки</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
