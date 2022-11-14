import { UserDto } from '../dtos/user-dto';

export interface IReply {
  userId: string;
  commentId: string;
  message: string;
  date?: Date;
  userReplyId: string;
}

export interface IReplyWithUser {
  user: UserDto;
  replyId: string;
  userReplyId?: string;
  message: string;
}
