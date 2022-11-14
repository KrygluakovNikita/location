import { Equal } from 'typeorm';
import { ILike } from '../controller/like-controller';
import { Comment, Like, Post, Reply, User, UserRole } from '../database/entity';
import ApiError from '../exeptions/api-error';

class ReplyService {
  async upload(data: ILike): Promise<Like> {
    const user = await User.findOneBy({ userId: data.userId });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    const post = await Post.findOneBy({ postId: data.postId });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }

    const like = new Like();
    like.post = post;
    like.user = user;

    await like.save();

    return like;
  }

  async getByPostId(postId: string): Promise<Like[]> {
    const post = await Post.findOneBy({ postId });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }

    const likes = await Like.find({ where: { post: Equal(postId) }, relations: { user: true } });

    return likes;
  }

  async getByUserId(userId: string): Promise<Like[]> {
    const user = await User.findOneBy({ userId });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    const likes = await Like.find({ where: { user: Equal(userId) }, relations: { post: true } });

    return likes;
  }

  async deleteByPostId(data: ILike): Promise<void> {
    const user = await User.findOneBy({ userId: data.userId });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    const post = await Post.findOneBy({ postId: data.postId });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }

    await Like.delete({ user: Equal(user.userId), post: Equal(post.postId) });

    return;
  }
}

export default new ReplyService();
