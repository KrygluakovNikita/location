import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

export enum PaymentType {
  CASH = "cash",
  CARD = "card",
}

@Entity()
export class Game {
  @PrimaryGeneratedColumn("uuid")
  game_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  user: User;

  @Column({ type: "timestamptz" })
  date: Date;

  @Column("text")
  hours: string;

  @Column({
    type: "enum",
    enum: PaymentType,
    default: PaymentType.CASH,
  })
  paument_type: PaymentType;
}
