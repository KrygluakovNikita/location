import { Post } from '../database/entity';
import { CommentDto } from './comment-dto';
import { LikeDto } from './like-dto';
import { UserDto } from './user-dto';

export class PostDto {
  postId: string;
  user: UserDto;
  likes: LikeDto[];
  comments: CommentDto[];
  title: string;
  description: string;
  postDate: Date;
  gameDate: Date;
  location: string;
  photo: string;
  constructor(model: Post) {
    console.log(model);

    this.postId = model.postId;
    this.user = new UserDto(model.user);
    this.likes = model?.likes?.map(like => new LikeDto(like)) ?? [];
    this.comments = model?.comments?.map(comment => new CommentDto(comment)) ?? [];
    this.description = model.description;
    this.title = model.title;
    this.gameDate = model.gameDate;
    this.postDate = model.postDate;
    this.location = model.location;
    this.photo = model.photo;
  }
}
