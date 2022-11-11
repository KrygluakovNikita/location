import { ResetToken } from './ResetToken';
import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, BaseEntity, OneToOne } from 'typeorm';
import { Post, Like, Game, Comment, Card } from './index';
import { Reply } from './Reply';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @OneToMany(type => Game, game => game.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'games' })
  games: Game[] | null;

  @OneToMany(type => Card, card => card.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'cards' })
  cards: Card[] | null;

  @OneToMany(type => Like, like => like.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'likes' })
  likes: Like[] | null;

  @OneToMany(type => Post, post => post.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'posts' })
  posts: Post[] | null;

  @OneToMany(type => Comment, comment => comment.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'comments' })
  comments: Comment[] | null;

  @OneToMany(type => Reply, reply => reply.reply, {
    nullable: true,
  })
  @JoinColumn({ name: 'replies' })
  replies: Reply[] | null;

  @OneToOne(() => ResetToken, token => token.user, { nullable: true })
  @JoinColumn({ name: 'reset_token' })
  resetToken: User;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @Column({ type: 'text', nullable: false, default: 'default.png' })
  password: string;

  @Column({ type: 'text', unique: true, nullable: false })
  nickname: string;

  @Column({ type: 'text', nullable: false })
  city: string;

  @Column({ type: 'text', nullable: true, name: 'phone_ip' })
  phoneIP: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'text', nullable: true, name: 'activation_link' })
  activationLink: string | null;

  @Column({ type: 'boolean', default: false, name: 'is_activated' })
  isActivated: boolean;

  @Column({ type: 'text', nullable: true })
  resetLink: string | null;
}
