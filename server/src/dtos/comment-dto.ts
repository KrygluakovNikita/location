import { Comment } from '../database/entity';
import { ReplyDto } from './reply-dto';
import { UserDto } from './user-dto';

export class CommentDto {
  commentId: string;
  postId: string;
  user: UserDto;
  message: string;
  date: Date;
  answers: ReplyDto[];
  constructor(model: Comment) {
    this.commentId = model.commentId;
    this.user = new UserDto(model.user);
    this.date = model.date;
    this.postId = model.post.postId;
    this.message = model.message;
    this.answers = model?.answers?.map(answer => new ReplyDto(answer)) ?? [];
  }
}
