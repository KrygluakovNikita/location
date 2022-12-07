import { FC, FormEvent, MouseEvent } from 'react';
import { CommentDto } from '../store/reducers/PostSlice';
import { CommentCard } from './CommentCard';
import './Comments.css';
import Plus from '../images/Plus.svg';
import Send from '../images/Send.svg';

interface ICommentProps {
  comments: CommentDto[];
}

export const Comments: FC<ICommentProps> = ({ comments }) => {
  const submitHandler = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    console.log('submitted');
    //add comment
  };
  return (
    <>
      <div className='comments'>
        {comments.map(comment => (
          <CommentCard key={comment.commentId} {...comment} />
        ))}
      </div>
      <form className='add-comment' onSubmit={e => submitHandler(e)}>
        <img src={Plus} alt='' className='plus-image' />
        <input placeholder='Комментарий' />
        <img src={Send} alt='' className='send-image' onClick={e => submitHandler(e)} />
      </form>
    </>
  );
};
