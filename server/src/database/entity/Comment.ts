import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  commentId: string;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Post, post => post.postId)
  @JoinColumn({ name: 'posts' })
  posts: Post;

  @Column('text')
  message: string;
}
