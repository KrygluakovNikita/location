import React, { FC } from 'react';
import { CommentDto } from '../store/reducers/PostSlice';
import { CommentCard } from './CommentCard';

interface ICommentProps {
  comments: CommentDto[];
}

export const Comments: FC<ICommentProps> = ({ comments }) => {
  return (
    <div className='comments'>
      {comments.map(comment => (
        <CommentCard {...comment} />
      ))}
    </div>
  );
};
