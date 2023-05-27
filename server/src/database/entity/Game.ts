import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Equipment } from './Equipment';

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

  @Column({ type: 'varchar', default: '1' })
  hours: string;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.CASH,
    name: 'payment_type',
  })
  paymentType: PaymentType;

  @Column({ type: 'boolean', default: false })
  isPayed: boolean;

  @Column({ type: 'timestamptz', default: new Date() }) // Recommended
  createdAt: Date;

  @ManyToOne(() => Equipment, equipment => equipment.games, { nullable: false })
  @JoinColumn()
  equipment: Equipment;
}
