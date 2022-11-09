import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, BaseEntity, PrimaryColumn } from 'typeorm';
import { Card } from './Card';
import { Comment } from './Comment';
import { Game } from './Game';
import { Like } from './Like';
import { Post } from './Post';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @OneToMany(type => Game, game => game.userId, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'games' })
  games: Game[] | null;

  @OneToMany(type => Card, card => card.userId, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'cards' })
  cards: Card[] | null;

  @OneToMany(type => Like, like => like.userId, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'likes' })
  likes: Like[] | null;

  @OneToMany(type => Post, post => post.userId, {
    nullable: true,
  })
  @JoinColumn({ name: 'posts' })
  posts: Post[] | null;

  @OneToMany(type => Comment, comment => comment.userId, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'comments' })
  comments: Comment[] | null;

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

  @Column({ type: 'text', nullable: true })
  phoneIP: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  activationLink: string | null;

  @Column({ type: 'boolean', default: false })
  isActivated: boolean;

  @Column({ type: 'text', nullable: true })
  resetLink: string | null;
}
