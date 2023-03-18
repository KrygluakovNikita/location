import React from 'react';
import { ChangeValueItem } from '../../components/ChangeValueItem';
import { HistoryItem } from '../../components/HistoryItem';
import { Sidebar } from '../../components/Sidebar';
import { useAppSelector } from '../../hooks/redux';
import { useUpdateUserDataMutation } from '../../store/api/UserApi';
import styles from './ProfileSettings.module.css';

export const ProfileSettings = () => {
  const user = useAppSelector(state => state.user);
  const [updateUserData] = useUpdateUserDataMutation();
  const changeEmailHanlder = (newEmail: string) => {
    updateUserData({ newEmail });
  };
  const changePasswordHanlder = (newPassword: string) => {
    updateUserData({ newPassword });
  };
  const changeCityHanlder = (newCity: string) => {
    updateUserData({ newCity });
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
              </div>
              <div className={styles.profileHistoryItems}>
                {user.games?.map(game => (
                  <HistoryItem id={game.gameId} date={game.date} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.userDataContainer}>
            <div className={styles.privacyPolicyContainer}>
              <button className={styles.userAgreementBtn}>
                <p className={styles.redText}>Пользовательское соглашение</p>
              </button>
            </div>
            <ChangeValueItem title='Email' placeHolder={user.email} onChange={changeEmailHanlder} />
            <ChangeValueItem title='Пароль' placeHolder='********' onChange={changePasswordHanlder} />
            <ChangeValueItem title='Город' placeHolder={user.city} onChange={changeCityHanlder} />
          </div>
        </div>
      </div>
    </div>
  );
};
