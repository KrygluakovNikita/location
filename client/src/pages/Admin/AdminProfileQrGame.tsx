import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Settings } from '../../images/Settings';
import { useGetGameQuery, useUpdatePayByGameIdMutation } from '../../store/api/GameApi';
import { GameDtoWithQr } from '../../store/reducers/UserSlice';
import styles from './AdminProfileQrGame.module.css';

export const AdminProfileQrGame = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const { data, isSuccess } = useGetGameQuery(gameId!);
  const [updatePayGame] = useUpdatePayByGameIdMutation();
  const [game, setGame] = useState<GameDtoWithQr | null>(null);
  const [isPayed, setIsPayed] = useState(false);

  useEffect(() => {
    if (data) {
      setIsPayed(data.isPayed);
      setGame(data as GameDtoWithQr);
    }
  }, [data, isSuccess]);

  const saveGame = () => {
    updatePayGame({ gameId: gameId!, isPayed });
  };

  const payHandler = () => {
    setIsPayed(prevState => !prevState);
  };
  return (
    <div>
      <Sidebar isProfile={true} />
      <div className={styles.mainContainer}>
        <div className={styles.secondContainer}>
          <div className={styles.sideContainer}></div>
          <div className={styles.cartContainer}>
            {game ? (
              <>
                <div className={styles.profilePhotoContainer}>
                  <img className={styles.profileImg} src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + game.user.photo} alt='' />
                  <div className={styles.profileUserData}>
                    <p className={styles.profileUserName}>{game.user.nickname}</p>
                    <p className={styles.profileUserCity}>{game.user.city}</p>
                  </div>
                </div>
                <div className={styles.profileScanContainer}>
                  <div className={styles.profileGameDatContainer}>
                    <div className={styles.profileIdGameContainer}>
                      <p className={styles.profileQRCodeIdText}>ID игры: </p>
                      <p className={styles.profileQRCodeId}>{game.gameId}</p>
                    </div>
                    <div className={styles.profileIdGameContainer}>
                      <p className={styles.profileQRCodeIdText}>Время игры: </p>
                      <p className={styles.profileQRCodeId}>
                        {game.hours} {+game.hours === 1 ? 'час' : 'часа'}
                      </p>
                    </div>
                    <div className={styles.profileIdGameContainer}>
                      <p className={styles.profileQRCodeIdText}>Способ оплаты: </p>
                      <p className={styles.profileQRCodeId}>наличные</p>
                    </div>
                    <div className={styles.profileIdGameContainer}>
                      <input type='checkbox' id='checkbox_id' className={styles.adminProfileCheckbox} checked={isPayed} onChange={payHandler} />
                      <p className={styles.profileQRCodeIdText}>Оплачено </p>
                    </div>
                  </div>
                  <div className={styles.profileGenerateQRBtnContainer}>
                    <button className={gameId ? styles.profileGenerateQRBtn : styles.profileGenerateQRBtnContainerDisabled} onClick={saveGame}>
                      <p className={styles.profileGenerateQRBtnText}>Сохранить</p>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.profileScanContainer}>
                <div className={styles.profileIdGameContainer}>
                  <p className={styles.profileQRCodeID}>Игра не найдена</p>
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
