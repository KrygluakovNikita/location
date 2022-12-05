import { useState, FC, MouseEvent } from 'react';
import './Sidebar.css';
import LogoImg from '../images/Logo.svg';
import { useNavigate } from 'react-router-dom';

interface ISideBarProps {
  isProfile: boolean;
}

export const Sidebar: FC<ISideBarProps> = ({ isProfile: defaultValue }) => {
  const [isProfile, setIsProfile] = useState(defaultValue);
  const [isFeed, setIsFeed] = useState(!defaultValue);
  const navigate = useNavigate();

  const clickHandler = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
      <div id='mySidenav' className='sidenav'>
        <img src={LogoImg} alt='Logo' className='sidebar-logo' onClick={e => clickHandler(e)} />
        <p
          className={`menu ${isFeed ? 'selected' : ''}`}
          onClick={e => {
            e.preventDefault();
            navigate('/');
            setIsFeed(true);
            setIsProfile(false);
          }}>
          Лента
        </p>
        <p
          className={`menu ${isProfile ? 'selected' : ''}`}
          onClick={e => {
            e.preventDefault();
            navigate('/profile');
            setIsFeed(false);
            setIsProfile(true);
          }}>
          Профиль
        </p>
      </div>
    </>
  );
};
