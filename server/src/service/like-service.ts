import { Equal } from 'typeorm';
import { ILike } from '../controller/like-controller';
import { Like, Post, User } from '../database/entity';
import { LikeDto } from '../dtos/like-dto';
import ApiError from '../exeptions/api-error';
import UserError from '../exeptions/user-error';

class ReplyService {
  async upload(data: ILike): Promise<LikeDto> {
    const user = await User.findOneBy({ userId: data.userId });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const post = await Post.findOneBy({ postId: data.postId });
    if (!post) {
      throw ApiError.NotFound();
    }

    const available = await Like.findOne({ where: { user: Equal(user.userId), post: Equal(post.postId) }, relations: { user: true, post: true } });
    if (available) {
      return;
    }

    const like = new Like();
    like.post = post;
    like.user = user;

    await like.save();

    const likeDto = new LikeDto(like);

    return likeDto;
  }

  async getByPostId(postId: string): Promise<Like[]> {
    const post = await Post.findOneBy({ postId });
    if (!post) {
      throw ApiError.NotFound();
    }

    const likes = await Like.find({ where: { post: Equal(postId) }, relations: { user: true } });

    return likes;
  }

  async getByUserId(userId: string): Promise<Like[]> {
    const user = await User.findOneBy({ userId });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const likes = await Like.find({ where: { user: Equal(userId) }, relations: { post: true } });

    return likes;
  }

  async deleteByPostId(data: ILike): Promise<void> {
    const user = await User.findOneBy({ userId: data.userId });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const post = await Post.findOneBy({ postId: data.postId });
    if (!post) {
      throw ApiError.NotFound();
    }

    await Like.delete({ user: Equal(user.userId), post: Equal(post.postId) });

    return;
  }
}

export default new ReplyService();
