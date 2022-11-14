import { IUserRequest } from './../interfaces/user-interface';
import { Request, Response, NextFunction } from 'express';
import commentService from '../service/comment-service';
import { IComment, ICommentWithUser } from '../interfaces/comment-interface';
import { UserDto } from '../dtos/user-dto';

class CommentController {
  async upload(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      const { message } = req.body as IComment;

      const { userId } = req.user;

      const gameDto: IComment = { userId, postId, message };
      const game = await commentService.upload(gameDto);

      return res.json(game);
    } catch (e) {
      next(e);
    }
  }

  async getByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;

      const comments = await commentService.getByPostId(postId);

      return res.json(comments);
    } catch (e) {
      next(e);
    }
  }

  async update(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { role, userId, email } = req.user as UserDto;
      const user = { role, userId, email };

      const commentId = req.params.commentId;
      const { message } = req.body;

      const commentDto: ICommentWithUser = { user, commentId, message };
      const post = await commentService.update(commentDto);

      return res.json(post);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { role, userId, email } = req.user as UserDto;
      const user = { role, userId, email };

      const commentId = req.params.commentId;
      const { message } = req.body;

      const commentDto: ICommentWithUser = { user, commentId, message };
      await commentService.delete(commentDto);

      return res.json({ message: 'Комментарий удалён' });
    } catch (e) {
      next(e);
    }
  }
}

export default new CommentController();
