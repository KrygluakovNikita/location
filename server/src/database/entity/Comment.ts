import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity, PrimaryColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  commentId: string;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Post, post => post.posId)
  posts: Post;

  @Column('text')
  message: string;
}
