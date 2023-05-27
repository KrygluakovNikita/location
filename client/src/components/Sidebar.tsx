import { useState, FC, MouseEvent, useEffect } from 'react';
import './Sidebar.css';
import LogoImg from '../images/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../store/api/UserApi';
import { useAppSelector } from '../hooks/redux';

interface ISideBarProps {
  isProfile: boolean;
  isFeed?: boolean;
  isEquipment?: boolean;
}

export const Sidebar: FC<ISideBarProps> = ({ isProfile: defaultValue, isFeed: feedValue, isEquipment: additionalValue = false }) => {
  const user = useAppSelector(state => state.user);
  const [isProfile, setIsProfile] = useState(defaultValue);
  const [isFeed, setIsFeed] = useState(feedValue);
  const [isEquipment, setIsEquipment] = useState(additionalValue);
  const navigate = useNavigate();
  const [Logout] = useLogoutMutation();

  const clickHandler = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    navigate('/');
  };

  const logoutHandler = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    Logout();
  };

  const clickFeedHandler = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    navigate('/');
    setIsFeed(true);
    setIsProfile(false);
    setIsEquipment(false);
  };

  const clickEquipmentHandler = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    navigate('/equipments');
    setIsFeed(false);
    setIsProfile(false);
    setIsEquipment(true);
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
    setIsEquipment(false);
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
        <p className={`menu ${isEquipment ? 'selected' : ''}`} onClick={e => clickEquipmentHandler(e)}>
          Оборудование
        </p>
        <p className='menu' onClick={e => logoutHandler(e)}>
          Выйти
        </p>
      </div>
    </>
  );
};
