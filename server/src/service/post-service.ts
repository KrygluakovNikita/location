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

  async getGamesByPosId(postId: string): Promise<Post[]> {
    const games = await Post.find({ loadRelationIds: true, where: { posId: Equal(postId) } });

    return games;
  }

  async getAll(): Promise<Post[]> {
    const games = await Post.find({ loadRelationIds: true });

    return games;
  }
}

export default new PostService();
