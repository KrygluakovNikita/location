import { IUserRequest } from './../interfaces/user-interface';
import { Request, Response, NextFunction } from 'express';
import likeService from '../service/like-service';

export interface ILike {
  userId: string;
  postId: string;
}

class LikeController {
  async upload(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      const { userId } = req.user;

      const likeDto: ILike = { userId, postId };
      const like = await likeService.upload(likeDto);

      return res.json(like);
    } catch (e) {
      next(e);
    }
  }
  async getByPostId(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;

      const likes = await likeService.getByPostId(userId);

      return res.json(likes);
    } catch (e) {
      next(e);
    }
  }
  async getByUserId(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const likes = await likeService.getByUserId(userId);

      return res.json(likes);
    } catch (e) {
      next(e);
    }
  }
  async deleteByPostId(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      const { userId } = req.user;

      const likeDto: ILike = { userId, postId };
      await likeService.deleteByPostId(likeDto);

      return res.end();
    } catch (e) {
      next(e);
    }
  }
}

export default new LikeController();
