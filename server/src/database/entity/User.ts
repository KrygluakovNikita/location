import { Token } from './Token';
import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, BaseEntity, OneToOne } from 'typeorm';
import { Post, Like, Game, Comment, Card, Reply } from './index';
import { RefreshToken } from './RefreshToken';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export const DB_DEFAULT_PHOTO = 'default.png';

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

  @OneToMany(type => Reply, reply => reply.userReply, {
    nullable: true,
  })
  @JoinColumn({ name: 'replies' })
  replies: Reply[] | null;

  @OneToOne(() => Token, token => token.user, { nullable: true })
  @JoinColumn({ name: 'reset_token' })
  resetToken: User;

  @Column({ type: 'varchar', unique: true, nullable: false, default: '' })
  email: string;

  @Column({ type: 'varchar', default: DB_DEFAULT_PHOTO })
  photo: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  password: string | null;

  @Column({ type: 'boolean', default: false, name: 'is_google' })
  isGoogle: boolean;

  @Column({ type: 'varchar', name: 'google_id', nullable: true, default: '' })
  googleId: string | null;

  @Column({ type: 'varchar', unique: true, nullable: false, default: '' })
  nickname: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  city: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true, name: 'activation_link', default: '' })
  activationLink: string | null;

  @Column({ type: 'boolean', default: false, name: 'is_activated' })
  isActivated: boolean;

  @Column({ type: 'varchar', nullable: true, name: 'reset_link', default: '' })
  resetLink: string | null;

  @OneToOne(type => RefreshToken, token => token.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  refreshToken: RefreshToken | null;
}
