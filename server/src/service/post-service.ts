import { Equal } from 'typeorm';
import { Post, User } from '../database/entity';
import { IPost } from '../interfaces/post-interface';

class PostService {
  async upload(data: IPost): Promise<Post> {
    const post = new Post();

    const user = await User.findOneBy({ userId: data.userId });

    post.user = user;
    post.title = data.title;
    post.description = data.description;
    post.postDate = new Date(Date.now());
    post.gameDate = data.gameDate;
    post.photo = data.photo;
    post.location = data.location;

    await post.save();

    return post;
  }

  async getOne(postId: string): Promise<Post[]> {
    const post = await Post.find({ where: { postId: Equal(postId) }, relations: { user: true } });

    return post;
  }

  async getAll(): Promise<Post[]> {
    const posts = await Post.find({ relations: { user: true } });

    return posts;
  }

  async delete(postId: string): Promise<Post> {
    const post = await Post.delete(postId);

    return post.raw;
  }
}

export default new PostService();
