import { FC, useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { ReplyDto, UserDto } from '../store/reducers/UserSlice';
import { convertPostDate } from '../utils/timeConverter';
import { AnswerCard } from './AnswerCard';
import { AnswerInput } from './AnswerInput';
import './CommentCard.css';

interface ICommentCardProps {
  commentId: string;
  user: UserDto;
  message: string;
  date: Date;
  answers: ReplyDto[];
}

export const CommentCard: FC<ICommentCardProps> = ({ message, answers, user: userComment, date }) => {
  const user = useAppSelector(state => state.user);

  const { postLocaleDate, postLocaleTime } = convertPostDate(date);
  const [reply, setReply] = useState(false);

  return (
    <div className=''>
      <div className='comment-user-info'>
        <img className='comment-img' src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + userComment.photo} alt='' />
        <div>
          <p className='comment-user-nickname'>{userComment.nickname}</p>
          <p className='comment-text'>{message}</p>
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
      {answers.map(answer => {
        return <AnswerCard key={answer.date.toString()} {...answer} commentReply={reply} setCommentReply={setReply} />;
      })}
      {reply && <AnswerInput user={user} userReply={userComment} setReply={setReply} />}
    </div>
  );
};
