import { FC, FormEvent, MouseEvent, useState } from 'react';
import { CommentCard } from './CommentCard';
import './Comments.css';
import Plus from '../images/Plus.svg';
import Send from '../images/Send.svg';
import { ICommentUpload, useAddCommentMutation } from '../store/api/CommentApi';
import { useAppSelector } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { CommentDto } from '../store/reducers/PostSlice';

interface ICommentProps {
  postId: string;
  comments: CommentDto[];
}

export const Comments: FC<ICommentProps> = ({ postId, comments }) => {
  const [uploadComment] = useAddCommentMutation();
  const user = useAppSelector(state => state.user);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    if (!user.userId) {
      navigate('/login');
    }
    if (message) {
      const dto: ICommentUpload = {
        postId,
        user,
        message,
      };
      await uploadComment(dto);
      setMessage('');
    }
  };

  return (
    <>
      <div className='comments'>
        {comments?.map(comment => (
          <CommentCard key={comment.commentId} {...comment} />
        ))}
      </div>
      <form className='add-comment' onSubmit={e => submitHandler(e)}>
        <img src={Plus} alt='' className='plus-image' />
        <input placeholder='Комментарий' value={message} onChange={e => setMessage(e.target.value)} />
        <img src={Send} alt='' className='send-image' onClick={e => submitHandler(e)} />
      </form>
    </>
  );
};
