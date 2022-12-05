import { useState, FC } from 'react';
import './Sidebar.css';
import LogoImg from '../images/Logo.svg';

interface ISideBarProps {
  profile: boolean;
}

export const Sidebar: FC<ISideBarProps> = ({ profile }) => {
  const [isProfile, setIsProfile] = useState(profile);
  const [isFeed, setIsFeed] = useState(!profile);

  return (
    <>
      <div id='mySidenav' className='sidenav'>
        <img src={LogoImg} alt='Logo' className='sidebar-logo' />

        <a
          href='/#'
          className={`menu ${isFeed ? 'selected' : ''}`}
          onClick={() => {
            setIsFeed(true);
            setIsProfile(false);
          }}>
          Лента
        </a>
        <a
          href='/#'
          className={`menu ${isProfile ? 'selected' : ''}`}
          onClick={() => {
            setIsFeed(false);
            setIsProfile(true);
          }}>
          Профиль
        </a>
      </div>
    </>
  );
};
