import { Reply } from '../database/entity';
import { CommentDto } from './comment-dto';
import { UserDto } from './user-dto';

export class ReplyDto {
  replyId: string;
  user: UserDto;
  userReply: UserDto;
  date: Date;
  message: string;
  comment: CommentDto;
  constructor(model: Reply) {
    this.replyId = model.replyId;
    this.user = new UserDto(model.user);
    if (model.userReply) this.userReply = new UserDto(model.userReply);
    this.comment=new CommentDto(model.comment)
    this.date = model.date;
    this.message = model.message;
  }
}
