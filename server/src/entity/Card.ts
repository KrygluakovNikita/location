import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "card" })
export class Card {
  @PrimaryGeneratedColumn("uuid")
  card_id: string;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  card_number: number;

  @Column({ type: "int2" })
  mmyy: string;

  @Column({ type: "int2" })
  cvv: number;
}
