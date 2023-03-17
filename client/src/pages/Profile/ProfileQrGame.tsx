import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { useAppSelector } from '../../hooks/redux';
import { Settings } from '../../images/Settings';
import { useGetGameQuery } from '../../store/api/GameApi';
import { GameDtoWithQr } from '../../store/reducers/UserSlice';
import styles from './ProfileQrGame.module.css';

export const ProfileQrGame = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const user = useAppSelector(state => state.user);
  const { data, isSuccess } = useGetGameQuery(gameId!);
  const [game, setGame] = useState<GameDtoWithQr | null>(null);

  useEffect(() => {
    if (data) setGame(data as GameDtoWithQr);
  }, [data, isSuccess]);
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
            {game ? (
              <div className={styles.profileScanContainer}>
                <div className={styles.profileQRCodeContainer}>
                  <img src={game.qrCode} alt='QR код' />
                </div>
                <div className={styles.profileIdGameContainer}>
                  <p className={styles.profileQRCodeIdText}>ID игры: </p>
                  <p className={styles.profileQRCodeId}>{game.gameId}</p>
                </div>
              </div>
            ) : (
              <div className={styles.profileScanContainer}>
                <div className={styles.profileIdGameContainer}>
                  <p className={styles.profileQRCodeID}>Такой аренды у вас нету</p>
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
