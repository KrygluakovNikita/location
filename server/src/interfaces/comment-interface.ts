import { Reply } from '../database/entity';
import { UserDto } from '../dtos/user-dto';

export interface IComment {
  userId?: string;
  postId?: string;
  message: string;
  date: Date;
  answers?: Reply[];
}

export interface ICommentUpdate {
  user: UserDto;
  commentId?: string;
  message: string;
}
