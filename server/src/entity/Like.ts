import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Like {
  @PrimaryGeneratedColumn("uuid")
  like_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  user_id: User;

  @ManyToOne(() => User, (user) => user.user_id)
  post_id: User;
}
