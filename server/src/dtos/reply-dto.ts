import { Reply } from '../database/entity';
import { UserDto } from './user-dto';

export class ReplyDto {
  replyId: string;
  user: UserDto;
  userReply: UserDto;
  date: Date;
  message: string;
  constructor(model: Reply) {
    this.replyId = this.replyId;
    this.user = new UserDto(model.user);
    this.userReply = new UserDto(model.userReply);
    this.date = model.date;
    this.message = model.message;
  }
}
