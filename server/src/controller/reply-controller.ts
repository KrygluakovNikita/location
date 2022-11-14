import { IUserRequest } from '../interfaces/user-interface';
import { Request, Response, NextFunction } from 'express';
import { UserDto } from '../dtos/user-dto';
import { IReply, IReplyWithUser } from '../interfaces/reply-interface';
import replyService from '../service/reply-service';

class ReplyController {
  async upload(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const commentId = req.params.commentId;
      const { message, userReplyId = null } = req.body as IReply;

      const { userId } = req.user;

      const replyDto: IReply = { userId, commentId, message, userReplyId };
      const game = await replyService.upload(replyDto);

      return res.json(game);
    } catch (e) {
      next(e);
    }
  }

  async getByCommentId(req: Request, res: Response, next: NextFunction) {
    try {
      const commentId = req.params.commentId;

      const comments = await replyService.getByCommentId(commentId);

      return res.json(comments);
    } catch (e) {
      next(e);
    }
  }

  async update(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { role, userId, email } = req.user as UserDto;
      const user = { role, userId, email };

      const replyId = req.params.replyId;
      const { message } = req.body;

      const commentDto: IReplyWithUser = { user, replyId, message };
      const post = await replyService.update(commentDto);

      return res.json(post);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { role, userId, email } = req.user as UserDto;
      const user = { role, userId, email };

      const replyId = req.params.replyId;
      const { message } = req.body;

      const commentDto: IReplyWithUser = { user, replyId, message };
      await replyService.delete(commentDto);

      return res.json({ message: 'Ответ на комментарий удалён' });
    } catch (e) {
      next(e);
    }
  }
}

export default new ReplyController();
