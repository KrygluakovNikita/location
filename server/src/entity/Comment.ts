import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  comment_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  user: User;

  @ManyToOne(() => Post, (post) => post.post_date)
  post: Post;

  @Column("text")
  message: string;
}
