import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  card_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  user: User;

  @Column("number")
  card_number: number;

  @Column({ type: "number", length: 4 })
  mmyy: string;

  @Column({ type: "number", length: 3 })
  cvv: number;
}
