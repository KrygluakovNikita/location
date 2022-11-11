import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, OneToMany, Index } from 'typeorm';
import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'reply' })
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'reply_id' })
  replyId: string;

  @ManyToOne(() => User, user => user.comments, { nullable: false })
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Comment, comment => comment.answers, { nullable: true })
  @JoinColumn({ name: 'comment' })
  comment: Comment;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({ type: 'timestamptz', default: new Date(Date.now()), nullable: false })
  date: string;

  @ManyToOne(type => User, { nullable: true })
  @JoinColumn({ name: 'reply' })
  reply: User | null;
}
