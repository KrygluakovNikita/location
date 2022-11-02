import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Card } from "./Card";
import { Comment } from "./Comment";
import { Game } from "./Game";
import { Like } from "./Like";
import { Post } from "./Post";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @OneToMany((type) => Game, (game) => game.user, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "games" })
  games: Game[] | null;

  @OneToMany((type) => Card, (card) => card.user, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "cards" })
  cards: Card[] | null;

  @OneToMany((type) => Like, (like) => like.user, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "likes" })
  likes: Like[] | null;

  @OneToMany((type) => Post, (post) => post.user, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "posts" })
  posts: Post[] | null;

  @OneToMany((type) => Comment, (comment) => comment.user, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "comments" })
  comments: Comment[] | null;

  @Column({ type: "text", unique: true, nullable: false })
  email: string;

  @Column("text")
  photo: string;

  @Column("text")
  passpord: string;

  @Column("text")
  nickname: string;

  @Column("text")
  city: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
