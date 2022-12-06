import { FC } from 'react';
import { UserDto } from '../store/reducers/UserSlice';
import { convertPostDate } from '../utils/timeConverter';
import './AnswerCard.css';

interface IAnswerCardProps {
  replyId: string;
  user: UserDto;
  userReply: UserDto;
  date: Date;
  message: string;
}

export const AnswerCard: FC<IAnswerCardProps> = ({ user, userReply, message, date }) => {
  const { postLocaleDate, postLocaleTime } = convertPostDate(date);
  return (
    <div className='answer-user-info'>
      <img className='comment-img' src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + user.photo} alt='' />
      <div>
        <p className='comment-user-nickname'>{user.nickname}</p>
        <div className='answer-user'>
          <p className='comment-text'>{userReply.nickname},</p>
          <p className='comment-text'>{message}</p>
        </div>
        <div className='comment-footer'>
          <p className='small-text'>
            {postLocaleDate} в {postLocaleTime}
          </p>
          <p className='small-text'>Ответить</p>
        </div>
      </div>
    </div>
  );
};
