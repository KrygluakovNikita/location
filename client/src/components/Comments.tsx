import { FC, FormEvent, MouseEvent, useState } from 'react';
import { CommentDto } from '../store/reducers/PostSlice';
import { CommentCard } from './CommentCard';
import './Comments.css';
import Plus from '../images/Plus.svg';
import Send from '../images/Send.svg';
import { ICommentUpload, useAddCommentMutation } from '../store/api/CommentApi';
import { useAppSelector } from '../hooks/redux';

interface ICommentProps {
  postId: string;
}

export const Comments: FC<ICommentProps> = ({ postId }) => {
  const comments = useAppSelector(state => state.postSlice.posts.find(post => post.postId === postId)?.comments);
  const [uploadComment] = useAddCommentMutation();
  const user = useAppSelector(state => state.user);
  const [message, setMessage] = useState('');

  const submitHandler = async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
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
