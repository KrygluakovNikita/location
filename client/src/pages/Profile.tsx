import React from 'react';
import { Sidebar } from '../components/Sidebar';
import styles from './Profile.module.css';

export const Profile = () => {
  return (
    <div className=''>
      <Sidebar isProfile={true} />
      <div className={styles.mainContainer}>
        <div className={styles.secondContainer}>
          <div className={styles.sideContainer}></div>
          <div className={styles.cartContainer}>
            <div>
              {/* <img/> */}
              <h3>Ваня</h3>
              <h6>Минск беларусь</h6>
            </div>
            <div>
              <button>дропдаун</button>
            </div>
            <div>
              <button>Сканировать QR</button>
            </div>
          </div>
          <div className={styles.sideContainer}>
            <button>настройки</button>
          </div>
        </div>
      </div>
    </div>
  );
};
