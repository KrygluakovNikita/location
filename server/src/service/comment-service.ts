import { Equal } from 'typeorm';
import { Comment, Post, User, UserRole } from '../database/entity';
import ApiError from '../exeptions/api-error';
import { IComment, ICommentWithUser } from '../interfaces/comment-interface';

class CommentService {
  async upload(data: IComment): Promise<Comment> {
    const comment = new Comment();

    const user = await User.findOneBy({ userId: data.userId });
    const post = await Post.findOneBy({ postId: data.postId });

    comment.post = post;
    comment.user = user;
    comment.message = data.message;

    await comment.save();

    return comment;
  }

  async getByPostId(postId: string): Promise<Comment[]> {
    const post = await Post.findOneBy({ postId });
    if (!post) {
      throw ApiError.BadRequest('Такого события не существует');
    }

    const comments = await Comment.find({ where: { post: Equal(post.postId) }, relations: { user: true, answers: true } });

    return comments;
  }

  async update({ commentId, message, user }: ICommentWithUser): Promise<Comment> {
    const comment = await Comment.findOne({ where: { commentId: Equal(commentId) }, relations: { user: true } });
    if (!comment) {
      throw ApiError.BadRequest('Такого комментария не существует');
    }

    if (comment.user.userId !== user.userId && user.role !== UserRole.ADMIN) {
      throw ApiError.BadRequest('Вы не можете изменить не свой комментарий');
    }

    comment.message = message;

    await comment.save();

    return comment;
  }

  async delete({ commentId, user }: ICommentWithUser): Promise<void> {
    const comment = await Comment.findOne({ where: { commentId: Equal(commentId) }, relations: { user: true } });
    if (!comment) {
      throw ApiError.BadRequest('Такого комментария не существует');
    }

    if (comment.user.userId !== user.userId && user.role !== UserRole.ADMIN) {
      throw ApiError.BadRequest('Вы не можете удалить не свой комментарий');
    }

    await Comment.delete(commentId);

    return;
  }
}

export default new CommentService();
