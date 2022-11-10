import { Equal } from 'typeorm';
import { Post } from '../database/entity';
import { IPost } from '../interfaces/post-interface';

class PostService {
  async upload(data: IPost): Promise<Post> {
    const post = new Post();

    post.userId = data.userId;
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
    const post = await Post.find({ loadRelationIds: true, where: { postId: Equal(postId) } });

    return post;
  }

  async getAll(): Promise<Post[]> {
    try {
      const posts = await Post.find({ loadRelationIds: true });
      console.log(posts);

      return posts;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(postId: string): Promise<Post> {
    const post = await Post.delete(postId);

    return post.raw;
  }
}

export default new PostService();
