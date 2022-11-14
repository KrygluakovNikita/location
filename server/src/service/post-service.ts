import { Equal } from 'typeorm';
import { Post, User } from '../database/entity';
import ApiError from '../exeptions/api-error';
import { IPost, IPostUpdate } from '../interfaces/post-interface';

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

  async getOne(postId: string): Promise<Post> {
    const post = await Post.findOne({
      where: { postId: Equal(postId) },
      relations: {
        user: true,
        comments: {
          user: true,
          answers: { userReply: true, user: true },
        },
      },
    });

    return post;
  }

  async getAll(): Promise<Post[]> {
    const posts = await Post.find({ relations: { user: true, comments: { answers: { userReply: true, user: true }, user: true } } });

    return posts;
  }

  async delete(postId: string): Promise<Post> {
    const post = await Post.delete(postId);

    return post.raw;
  }

  async update(postDto: IPostUpdate): Promise<Post> {
    const post = await Post.findOne({ where: { postId: postDto.postId } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }

    const data: Post = { ...post, ...postDto } as Post;

    const result = await Post.save(data);

    return result;
  }
}

export default new PostService();
