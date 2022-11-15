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
      throw ApiError.NotFound();
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
      throw ApiError.NotFound();
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
      throw ApiError.NotFound();
    }

    if (reply.user.userId !== user.userId && user.role !== UserRole.ADMIN) {
      throw UserError.NotAllow();
    }

    reply.message = message;

    await reply.save();

    return reply;
  }

  async delete({ replyId, user }: IReplyWithUser): Promise<void> {
    const comment = await Reply.findOne({ where: { replyId: Equal(replyId) }, relations: { user: true } });
    if (!comment) {
      throw ApiError.NotFound();
    }

    if (comment.user.userId !== user.userId && user.role !== UserRole.ADMIN) {
      throw UserError.NotAllow();
    }

    await Reply.delete(replyId);

    return;
  }
}

export default new ReplyService();
