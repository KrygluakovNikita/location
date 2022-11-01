import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Card } from "./Card";
import { Game } from "./Game";
import { Like } from "./Like";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: number;

  @OneToMany((type) => Game, (game) => game.game_id)
  games: User[];

  @OneToMany((type) => Card, (card) => card.card_id)
  cards: User[];

  @OneToMany((type) => Like, (like) => like.like_id)
  likes: User[];

  @Column("text")
  email: string;

  @Column("text")
  photo: string;

  @Column("text")
  passpord: string;

  @Column("text")
  nickname: boolean;

  @Column("text")
  city: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
