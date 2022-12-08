import { Like } from '../database/entity';
import { UserDto } from './user-dto';

export class LikeDto {
  likeId: string;
  postId: string;
  user: UserDto;
  constructor(model: Like) {
    this.postId = model.post.postId;
    this.likeId = model.likeId;
    this.user = new UserDto(model.user);
  }
}
