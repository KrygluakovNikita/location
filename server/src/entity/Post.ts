import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  post_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  user: User;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "timestamptz", default: new Date(Date.now()) })
  post_date: Date;

  @Column({ type: "timestamptz" })
  game_date: Date;

  @Column({ type: "text" })
  location: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  image: string;
}
