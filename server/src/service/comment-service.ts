import { Equal } from 'typeorm';
import { Comment, Post, User, UserRole } from '../database/entity';
import { CommentDto } from '../dtos/comment-dto';
import ApiError from '../exeptions/api-error';
import UserError from '../exeptions/user-error';
import { IComment, ICommentWithUser } from '../interfaces/comment-interface';

class CommentService {
  async upload(data: IComment): Promise<CommentDto> {
    const comment = new Comment();

    const user = await User.findOneBy({ userId: data.userId });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const post = await Post.findOneBy({ postId: data.postId });
    if (!post) {
      throw ApiError.NotFound();
    }

    comment.post = post;
    comment.user = user;
    comment.message = data.message;

    await comment.save();

    const result = new CommentDto(comment);

    return result;
  }

  async getByPostId(postId: string): Promise<CommentDto[]> {
    const post = await Post.findOneBy({ postId });
    if (!post) {
      throw ApiError.NotFound();
    }

    const comments = await Comment.find({ where: { post: Equal(post.postId) }, relations: { user: true, answers: { user: true, userReply: true } } });

    const result = comments.map(comment => new CommentDto(comment));

    return result;
  }

  async update({ commentId, message, user }: ICommentWithUser): Promise<CommentDto> {
    const candidate = await User.findOneBy({ userId: user.userId });
    if (!candidate) {
      throw UserError.UserNotFound();
    }

    const comment = await Comment.findOne({ where: { commentId: Equal(commentId) }, relations: { user: true, answers: true } });
    if (!comment) {
      throw ApiError.NotFound();
    }

    if (comment.user.userId !== user.userId && user.role !== UserRole.ADMIN) {
      throw UserError.NotAllow();
    }

    comment.message = message;

    await comment.save();
    const result = new CommentDto(comment);

    return result;
  }

  async delete({ commentId, user }: ICommentWithUser): Promise<void> {
    const candidate = await User.findOneBy({ userId: user.userId });
    if (!candidate) {
      throw UserError.UserNotFound();
    }

    const comment = await Comment.findOne({ where: { commentId: Equal(commentId) }, relations: { user: true } });
    if (!comment) {
      throw ApiError.NotFound();
    }

    if (comment.user.userId !== user.userId && user.role !== UserRole.ADMIN) {
      throw UserError.NotAllow();
    }

    await Comment.delete(commentId);

    return;
  }
}

export default new CommentService();
