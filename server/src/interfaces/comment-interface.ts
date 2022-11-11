import { Reply } from '../database/entity';

export interface IComment {
  userId?: string;
  postId?: string;
  message: string;
  date: Date;
  answers?: Reply[];
}

export interface ICommentUpdate {
  userId: string;
  commentId?: string;
  message: string;
}
