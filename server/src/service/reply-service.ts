import { Equal } from 'typeorm';
import { Comment, Reply, User, UserRole } from '../database/entity';
import ApiError from '../exeptions/api-error';
import UserError from '../exeptions/user-error';
import { IReply, IReplyWithUser } from '../interfaces/reply-interface';

class ReplyService {
  async upload(data: IReply): Promise<Reply> {
    const reply = new Reply();

    const user = await User.findOneBy({ userId: data.userId });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const comment = await Comment.findOne({ where: { commentId: Equal(data.commentId) }, relations: { user: true } });

    if (!comment) {
      throw ApiError.BadRequest('Такого сообщения не существует');
    }

    if (data.userReplyId) {
      const repliedUser = await User.findOneBy({ userId: data.userReplyId });
      if (!repliedUser) {
        throw ApiError.BadRequest('Пользователя на которого вы ссылаетесь не существует');
      }

      reply.userReply = repliedUser;
    } else {
      reply.userReply = comment.user;
    }

    reply.comment = comment;
    reply.user = user;
    reply.message = data.message;

    await reply.save();

    return reply;
  }

  async getByCommentId(commentId: string): Promise<Reply[]> {
    const comment = await Comment.findOneBy({ commentId });
    if (!comment) {
      throw ApiError.BadRequest('Такого комментария не существует');
    }

    const replies = await Reply.find({ where: { comment: Equal(comment.commentId) }, relations: { user: true } });

    return replies;
  }

  async update({ replyId, message, user }: IReplyWithUser): Promise<Reply> {
    const candidate = await User.findOneBy({ userId: user.userId });
    if (!candidate) {
      throw UserError.UserNotFound();
    }

    const reply = await Reply.findOne({ where: { replyId: Equal(replyId) }, relations: { user: true } });
    if (!reply) {
      throw ApiError.BadRequest('Такого ответа на комментарий не существует');
    }

    if (reply.user.userId !== user.userId && user.role !== UserRole.ADMIN) {
      throw ApiError.BadRequest('Вы не можете изменить не свой ответ на комментарий');
    }

    reply.message = message;

    await reply.save();

    return reply;
  }

  async delete({ replyId, user }: IReplyWithUser): Promise<void> {
    const comment = await Reply.findOne({ where: { replyId: Equal(replyId) }, relations: { user: true } });
    if (!comment) {
      throw ApiError.BadRequest('Такого ответа на комментария не существует');
    }

    if (comment.user.userId !== user.userId && user.role !== UserRole.ADMIN) {
      throw ApiError.BadRequest('Вы не можете удалить не свой овтет на комментарий');
    }

    await Reply.delete(replyId);

    return;
  }
}

export default new ReplyService();
