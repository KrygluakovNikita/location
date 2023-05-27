import { FC, useState, useEffect, MouseEvent } from 'react';
import { LikeDto, UserDto } from '../store/reducers/UserSlice';
import './EquipmentCard.css';
import Pointer from '../images/Pointer.svg';
import Icon from '../images/Icon.svg';
import HeartIcon from '../images/Heart.svg';
import FullHeartIcon from '../images/FullHeart.svg';
import Comment from '../images/Comment.svg';
import { Share } from './Share';
import { UserInfo } from './UserInfo';
import { convertGameDate, convertPostDate } from '../utils/timeConverter';
import { CommentDto } from '../store/reducers/PostSlice';
import { useAddLikeMutation, useDeleteLikeMutation } from '../store/api/PostApi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import moment from 'moment';
import { EquipmentDto } from '../store/api/EquipmentApi';

export const EquipmentCard: FC<EquipmentDto> = ({ title, description, equipmentId, price, count }) => {
  const user = useAppSelector(state => state.user);
  const maxDescriptionLength = 150;
  const defaultImage = 'default_image.jpg';

  return (
    <div className='post'>
      <div className='info'>
        <p className='title'>{title}</p>
        <p className='description post-text'>
          {description.length > maxDescriptionLength ? description.slice(0, maxDescriptionLength) + '...' : description}
        </p>
        <p className='description post-text'>
          {description.length > maxDescriptionLength ? description.slice(0, maxDescriptionLength) + '...' : description}
        </p>
      </div>
      {/* <div className='image-wrapper'>
        {photo ? (
          <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + photo} alt='' />
        ) : (
          <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + defaultImage} alt='' />
        )}
      </div> */}
    </div>
  );
};
