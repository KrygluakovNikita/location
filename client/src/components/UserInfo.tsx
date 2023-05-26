import React, { FC } from 'react';
import { UserDto } from '../store/reducers/UserSlice';
import './UserInfo.css';

interface IUserInfoProps {
  user: UserDto;
  postLocaleDate: string;
  postLocaleTime: string;
  isEdited: boolean;
}

export const UserInfo: FC<IUserInfoProps> = ({ user, postLocaleDate, postLocaleTime, isEdited }) => {
  return (
    <div className='user-info'>
      <img className='img' src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + user.photo} alt='' />
      <div className='user-text'>
        <p className='user-nickname'>{user.nickname}</p>
        <p className='post-date'>
          {postLocaleDate} в {postLocaleTime} {isEdited ? 'изменено' : ''}
        </p>
      </div>
    </div>
  );
};
