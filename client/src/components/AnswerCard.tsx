import { FC, useState, Dispatch, useEffect } from 'react';
import { useAppSelector } from '../hooks/redux';
import { UserDto } from '../store/reducers/UserSlice';
import { convertPostDate } from '../utils/timeConverter';
import './AnswerCard.css';
import { AnswerInput } from './AnswerInput';

interface IAnswerCardProps {
  replyId: string;
  user: UserDto;
  userReply: UserDto;
  date: Date;
  message: string;
  commentReply: boolean;
  setCommentReply: Dispatch<React.SetStateAction<boolean>>;
}

export const AnswerCard: FC<IAnswerCardProps> = ({ commentReply, setCommentReply, user: userComment, userReply, message, date }) => {
  const { postLocaleDate, postLocaleTime } = convertPostDate(date);
  const [reply, setReply] = useState(false);
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (commentReply && reply) {
      setCommentReply(false);
    }
  }, [reply]);

  useEffect(() => {
    if (commentReply && reply) {
      setReply(false);
    }
  }, [commentReply]);

  return (
    <>
      <div className='answer-user-info'>
        <img className='comment-img' src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + userComment.photo} alt='' />
        <div>
          <p className='comment-user-nickname'>{userComment.nickname}</p>
          <div className='answer-user'>
            <p className='comment-text'>{userReply.nickname},</p>
            <p className='comment-text'>{message}</p>
          </div>
          <div className='comment-footer'>
            <p className='small-text'>
              {postLocaleDate} в {postLocaleTime}
            </p>
            <p className='small-text' onClick={() => setReply(true)}>
              Ответить
            </p>
          </div>
        </div>
      </div>
      {reply && <AnswerInput user={user} userReply={userReply} setReply={setReply} />}
    </>
  );
};
