import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { useAppSelector } from '../../hooks/redux';
import styles from './AdminProfile.module.css';
import { Settings } from '../../images/Settings';
import { useNavigate } from 'react-router-dom';
export const AdminProfile = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);
  const [gameId, setGameId] = useState<string>('');

  const findGame = async () => {
    navigate(`/admin/profile/${gameId}`);
    setGameId('');
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
              <div className={styles.addInput}>
                <input placeholder='ID игры' value={gameId} onChange={e => setGameId(e.target.value)} />
              </div>

              <div className={styles.profileGenerateQRBtnContainer}>
                <button className={gameId ? styles.profileGenerateQRBtn : styles.profileGenerateQRBtnContainerDisabled} onClick={findGame}>
                  <p className={styles.profileGenerateQRBtnText}>Найти игру</p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.sideContainer}>
            <button className={styles.profileSettingContainer} onClick={() => navigate('/admin/profile/settings')}>
              <Settings color={'white'} />
              <p className={styles.profileSettingText}>Настройки</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
