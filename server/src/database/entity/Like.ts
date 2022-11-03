import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'like' })
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  like_id: string;

  @ManyToOne(() => User, user => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, post => post.likes, { nullable: true })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
