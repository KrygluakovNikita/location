import { Equal } from 'typeorm';
import { Comment, Post, User, UserRole } from '../database/entity';
import { CommentDto } from '../dtos/comment-dto';
import ApiError from '../exeptions/api-error';
import { IComment, ICommentWithUser } from '../interfaces/comment-interface';

class CommentService {
  async upload(data: IComment): Promise<CommentDto> {
    const comment = new Comment();

    const user = await User.findOneBy({ userId: data.userId });
    if (!user) {
      throw ApiError.BadRequest('Такого пользоваетля не существует');
    }

    const post = await Post.findOneBy({ postId: data.postId });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
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
      throw ApiError.BadRequest('Такого события не существует');
    }

    const comments = await Comment.find({ where: { post: Equal(post.postId) }, relations: { user: true, answers: { user: true, userReply: true } } });

    const result = comments.map(comment => new CommentDto(comment));

    return result;
  }

  async update({ commentId, message, user }: ICommentWithUser): Promise<CommentDto> {
    const comment = await Comment.findOne({ where: { commentId: Equal(commentId) }, relations: { user: true, answers: true } });
    if (!comment) {
      throw ApiError.BadRequest('Такого комментария не существует');
    }

    if (comment.user.userId !== user.userId && user.role !== UserRole.ADMIN) {
      throw ApiError.BadRequest('Вы не можете изменить не свой комментарий');
    }

    comment.message = message;

    await comment.save();
    const result = new CommentDto(comment);

    return result;
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
