import React, { FC } from 'react';
import { ReplyDto, UserDto } from '../store/reducers/UserSlice';
import { convertPostDate } from '../utils/timeConverter';
import { AnswerCard } from './AnswerCard';
import './CommentCard.css';

interface ICommentCardProps {
  commentId: string;
  user: UserDto;
  message: string;
  date: Date;
  answers: ReplyDto[];
}

export const CommentCard: FC<ICommentCardProps> = ({ message, answers, user, date }) => {
  const { postLocaleDate, postLocaleTime } = convertPostDate(date);
  return (
    <div className=''>
      <div className='comment-user-info'>
        <img className='comment-img' src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + user.photo} alt='' />
        <div>
          <p className='comment-user-nickname'>{user.nickname}</p>
          <p className='comment-text'>{message}</p>
          <div className='comment-footer'>
            <p className='small-text'>
              {postLocaleDate} в {postLocaleTime}
            </p>
            <p className='small-text'>Ответить</p>
          </div>
        </div>
      </div>
      {answers.map(answer => (
        <AnswerCard key={answer.replyId} {...answer} />
      ))}
    </div>
  );
};
