import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity({ name: "comment" })
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  comment_id: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Post, (post) => post.post_id)
  posts: Post;

  @Column("text")
  message: string;
}
