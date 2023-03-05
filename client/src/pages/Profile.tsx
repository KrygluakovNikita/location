import { Sidebar } from '../components/Sidebar';
import { useAppSelector } from '../hooks/redux';
import styles from './Profile.module.css';
import { Settings } from '../images/Settings';

export const Profile = () => {
  const user = useAppSelector(state => state.user);
  console.log(user);

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
                <select className={styles.selectContainer}>
                  <option value='' disabled selected>
                    Время игры
                  </option>
                  <option value='1'>1 час</option>
                  <option value='2'>2 часа</option>
                  <option value='4'>4 часа</option>
                </select>
              </div>
              <div className={styles.profileSelectPayTypeMainContainer}>
                <select className={styles.selectContainer}>
                  <option value='' disabled selected>
                    Тип оплаты
                  </option>
                  <option value='cash'>Наличные</option>
                  <option value='card'>Карта</option>
                </select>
              </div>

              <div className={styles.profileGenerateQRBtnContainer}>
                <button className={styles.profileGenerateQRBtn}>
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
