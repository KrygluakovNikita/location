import { useState, FC, MouseEvent } from 'react';
import './Sidebar.css';
import LogoImg from '../images/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../store/api/UserApi';
import { useAppSelector } from '../hooks/redux';

interface ISideBarProps {
  isProfile: boolean;
}

export const Sidebar: FC<ISideBarProps> = ({ isProfile: defaultValue }) => {
  const user = useAppSelector(state => state.user);
  const [isProfile, setIsProfile] = useState(defaultValue);
  const [isFeed, setIsFeed] = useState(!defaultValue);
  const navigate = useNavigate();
  const [Logout] = useLogoutMutation();

  const clickHandler = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    navigate('/');
  };

  const logoutHandler = (e: MouseEvent<HTMLParagraphElement>) => {
    Logout();
  };

  const clickFeedHandler = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    navigate('/');
    setIsFeed(true);
    setIsProfile(false);
  };

  const clickProfileHandler = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    if (user.userId) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
    setIsFeed(false);
    setIsProfile(true);
  };

  return (
    <>
      <div className='sidenav'>
        <img src={LogoImg} alt='Logo' className='sidebar-logo' onClick={e => clickHandler(e)} />
        <p className={`menu ${isFeed ? 'selected' : ''}`} onClick={e => clickFeedHandler(e)}>
          Лента
        </p>
        <p className={`menu ${isProfile ? 'selected' : ''}`} onClick={e => clickProfileHandler(e)}>
          Профиль
        </p>
        <p className='menu' onClick={e => logoutHandler(e)}>
          Выйти
        </p>
      </div>
    </>
  );
};
