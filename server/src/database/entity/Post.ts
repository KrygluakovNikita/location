import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity, PrimaryColumn } from 'typeorm';
import { Comment } from './Comment';
import { Like } from './Like';
import { User } from './User';

@Entity({ name: 'post' })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'post_id' })
  posId: string;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @OneToMany(() => Comment, comment => comment.commentId, { nullable: true })
  @JoinColumn({ name: 'comment_id' })
  comments: Comment[] | null;

  @ManyToOne(() => Like, like => like.post, { nullable: true })
  @JoinColumn({ name: 'like_id' })
  likes: Comment;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'timestamptz', default: new Date(Date.now()), name: 'post_date' })
  postDate: Date;

  @Column({ type: 'timestamptz', name: 'game_date' })
  gameDate: Date;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  image: string;
}
