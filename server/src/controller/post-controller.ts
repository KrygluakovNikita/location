import { IUserRequest } from './../interfaces/user-interface';
import { Request, Response, NextFunction } from 'express';
import postService from '../service/post-service';
import { IPost, IPostUpdate } from '../interfaces/post-interface';

class PostController {
  async upload(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { title, description, postDate = null, gameDate, location = null } = req.body as IPost;

      const photo = req.file.filename;
      const { userId } = req.user;
      const postDto: IPost = { title, description, postDate, gameDate, location, photo, userId };

      const userData = await postService.upload(postDto);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async update(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { title, description, gameDate, location, postId } = req.body as IPostUpdate;

      const postDto: IPostUpdate = { postId, title, description, gameDate, location };
      const post = await postService.update(postDto);

      return res.json(post);
    } catch (e) {
      next(e);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      await postService.delete(postId);

      return res.json({ message: 'Post deleted success' });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      const post = await postService.getOne(postId);

      return res.json(post);
    } catch (e) {
      next(e);
    }
  }
  async search(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getAll();

      return res.json(posts);
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
