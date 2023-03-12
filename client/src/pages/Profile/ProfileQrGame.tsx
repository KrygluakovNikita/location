import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { useAppSelector } from '../../hooks/redux';
import { Settings } from '../../images/Settings';
import styles from './ProfileQrGame.module.css';

export const ProfileQrGame = () => {
  const { gameId } = useParams();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (gameId) {
    } else {
    }
  }, [gameId]);
  return (
    <div>
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
              <div className={styles.profileQRCodeContainer}>s</div>
              <div className={styles.profileIdGameContainer}>
                <p>ID игры:</p>
                <p>12343423</p>
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
