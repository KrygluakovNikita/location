import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'like' })
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'like_id' })
  likeId: string;

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Post, post => post.likes, { nullable: true })
  @JoinColumn({ name: 'post' })
  post: Post;
}
