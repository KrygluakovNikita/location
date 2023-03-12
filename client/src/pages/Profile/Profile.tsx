import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { useAppSelector } from '../../hooks/redux';
import styles from './Profile.module.css';
import { Settings } from '../../images/Settings';
import { useAddGameMutation } from '../../store/api/GameApi';
import { PaymentType } from '../../store/reducers/UserSlice';

export const Profile = () => {
  const user = useAppSelector(state => state.user);
  const [addGame, { data, isLoading }] = useAddGameMutation();
  const [hours, setHours] = useState<null | string>(null);
  const [payType, setPayType] = useState<null | PaymentType>(null);
  const [playDate, setPlayDate] = useState<null | string>(null);
  const [isCreateGame, setIsCreateGame] = useState(true);
  const [qrCOde, setQRCOde] = useState(null);

  const createGame = async () => {
    if (hours && payType && playDate) {
      await addGame({ hours, paymentType: payType, date: new Date(playDate) })
        .then((data: any) => {
          console.log('data');
          console.log(data.data);
          setQRCOde(data.data.qrCode);
        })
        .finally(() => {
          setIsCreateGame(false);
          setHours(null);
          setPayType(null);
          setPlayDate(null);
        });
    }
  };

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

            <div className={styles.profileScanContainer}>
              <div className={styles.profileSelectMainContainer}>
                <select
                  className={styles.selectContainer}
                  onChange={event => {
                    setHours(event.currentTarget.value);
                  }}
                  value={hours ?? ''}>
                  <option value='' disabled selected>
                    Время игры
                  </option>
                  <option value='1'>1 час</option>
                  <option value='2'>2 часа</option>
                  <option value='4'>4 часа</option>
                </select>
              </div>
              <div className={styles.profileSelectPayTypeMainContainer}>
                <select
                  className={styles.selectContainer}
                  onChange={event => {
                    setPayType(event.currentTarget.value as PaymentType);
                  }}
                  value={payType ?? ''}>
                  <option value='' disabled selected>
                    Тип оплаты
                  </option>
                  <option value='cash'>Наличные</option>
                  <option value='card'>Карта</option>
                </select>
              </div>
              <div className={styles.profileSelectDate}>
                <input
                  type='datetime-local'
                  onChange={e => {
                    console.log('e.currentTarget.value');
                    console.log(e.currentTarget.value);

                    setPlayDate(e.currentTarget.value);
                  }}
                  className={styles.profileDateTimeContainer}
                  value={playDate ?? ''}
                />
              </div>

              <div className={styles.profileGenerateQRBtnContainer}>
                <button
                  className={hours && payType && playDate ? styles.profileGenerateQRBtn : styles.profileGenerateQRBtnContainerDisabled}
                  onClick={createGame}>
                  <p className={styles.profileGenerateQRBtnText}>Сгенерировать QR код</p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.sideContainer}>
            <button className={styles.profileSettingContainer}>
              <Settings color={'white'} />
              <p className={styles.profileSettingText}>Настройки</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
