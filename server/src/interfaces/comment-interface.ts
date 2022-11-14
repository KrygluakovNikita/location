import { UserDto } from '../dtos/user-dto';

export interface IComment {
  userId?: string;
  postId?: string;
  message: string;
  date?: Date;
}

export interface ICommentWithUser {
  user: UserDto;
  commentId?: string;
  message: string;
}
