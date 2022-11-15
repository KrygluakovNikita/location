import { Reply } from './Reply';
import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, OneToMany } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  commentId: string;

  @ManyToOne(() => User, user => user.comments, { nullable: false })
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Post, post => post.comments, { nullable: true })
  @JoinColumn({ name: 'post' })
  post: Post;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({ type: 'timestamptz', default: new Date(Date.now()), nullable: false })
  date: Date;

  @OneToMany(() => Reply, reply => reply.comment, { nullable: true, cascade: true })
  @JoinColumn({ name: 'answers' })
  answers: Reply[];
}
