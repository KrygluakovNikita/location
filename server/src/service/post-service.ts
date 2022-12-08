import { unlink } from 'fs/promises';
import path from 'path';
import { Equal } from 'typeorm';
import { Post, User } from '../database/entity';
import { PostDto } from '../dtos/post-dto';
import ApiError from '../exeptions/api-error';
import UserError from '../exeptions/user-error';
import { IPost, IPostUpdate } from '../interfaces/post-interface';

class PostService {
  async upload(data: IPost): Promise<PostDto> {
    const post = new Post();

    const user = await User.findOneBy({ userId: data.userId });

    if (!user) {
      throw UserError.UserNotFound();
    }

    post.user = user;
    post.title = data.title;
    post.description = data.description;
    post.postDate = new Date(Date.now());
    post.gameDate = data.gameDate;
    post.location = data.location;

    await post.save();

    const result = new PostDto(post);

    return result;
  }

  async updatePhoto(postId: string, newPhoto: string): Promise<void> {
    const post = await Post.findOneBy({ postId });
    if (!post) {
      throw ApiError.NotFound();
    }

    const previousPhoto = post.photo;

    if (previousPhoto) {
      const p = path.join(__dirname, '../../public/', previousPhoto);
      await unlink(p);

      if (newPhoto) {
        post.photo = newPhoto;
      } else {
        post.photo = '';
      }
    } else {
      post.photo = newPhoto;
    }

    await post.save();

    return;
  }

  async getOne(postId: string): Promise<PostDto> {
    const post = await Post.findOne({
      where: { postId: Equal(postId) },
      relations: {
        user: true,
        comments: {
          user: true,
          answers: { userReply: true, user: true },
          post: true,
        },
        likes: { user: true },
      },
    });
    const result = new PostDto(post);

    return result;
  }

  async getAll(): Promise<PostDto[]> {
    const posts = await Post.find({
      relations: {
        user: true,
        comments: {
          user: true,
          answers: { userReply: true, user: true, comment: true },
          post: true,
        },
        likes: { user: true },
      },
    });

    const result = posts.map(post => new PostDto(post));

    return result;
  }

  async delete(postId: string): Promise<void> {
    await Post.delete(postId);

    const port = await Post.findOneBy({ postId });
    if (!port) {
      throw UserError.UserNotFound();
    }

    if (port.photo) {
      const p = path.join(__dirname, '../../public/', port.photo);
      await unlink(p);

      port.photo = '';
    }

    port.save();

    return;
  }

  async update(postDto: IPostUpdate): Promise<PostDto> {
    const post = await Post.findOne({ where: { postId: postDto.postId } });
    if (!post) {
      throw ApiError.NotFound();
    }

    const data: Post = { ...post, ...postDto } as Post;
    const updatedPost = await Post.save(data);
    const result = new PostDto(updatedPost);

    return result;
  }
}

export default new PostService();
