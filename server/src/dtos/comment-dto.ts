import { Comment, Reply } from '../database/entity';
import { ReplyDto } from './reply-dto';
import { UserDto } from './user-dto';

export class CommentDto {
  commentId: string;
  user: UserDto;
  message: string;
  date: Date;
  answers: ReplyDto[];
  constructor(model: Comment) {
    console.log(model);

    this.commentId = model.commentId;
    this.user = new UserDto(model.user);
    this.date = model.date;
    this.message = model.message;
    this.answers = model.answers.map(answer => new ReplyDto(answer)) ?? [];
  }
}
