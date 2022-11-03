import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';

export enum PaymentType {
  CASH = 'cash',
  CARD = 'card',
}

@Entity({ name: 'game' })
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  game_id: string;

  @ManyToOne(() => User, user => user.games)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column('text')
  hours: string;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.CASH,
  })
  paument_type: PaymentType;
}
