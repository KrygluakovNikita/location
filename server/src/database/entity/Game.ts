import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, PrimaryColumn } from 'typeorm';
import { User } from './User';

export enum PaymentType {
  CASH = 'cash',
  CARD = 'card',
}

@Entity({ name: 'game' })
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'game_id' })
  gameId: string;

  @ManyToOne(() => User, user => user.games)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column({ type: 'timestamptz', nullable: false })
  date: Date;

  @Column('text')
  hours: string;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.CASH,
    name: 'payment_type',
  })
  paymentType: PaymentType;
}
