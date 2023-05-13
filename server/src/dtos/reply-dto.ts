import { Reply } from '../database/entity';
import { UserDto } from './user-dto';

export class ReplyDto {
  replyId: string;
  user: UserDto;
  userReply: UserDto;
  date: Date;
  message: string;
  commentId: string;
  constructor(model: Reply) {
    this.replyId = model.replyId;
    this.user = new UserDto(model.user);
    if (model.userReply) this.userReply = new UserDto(model.userReply);
    this.commentId = model.comment.commentId;
    this.date = model.date;
    this.message = model.message;
  }
}
