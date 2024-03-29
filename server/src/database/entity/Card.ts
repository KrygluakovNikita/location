import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity({ name: 'card' })
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'card_id' })
  cardId: string;

  @ManyToOne(() => User, user => user.cards)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  card_number: number;

  @Column({ type: 'int2' })
  mmyy: string;

  @Column({ type: 'int2' })
  cvv: number;
}
