import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'reset_token' })
export class ResetToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'reset_id' })
  resetId: string;

  @OneToOne(() => User, user => user.resetToken, { nullable: false })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column({ type: 'varchar', length: 6, unique: true })
  pin: string;

  @Column({ type: 'text', name: 'reset_token', default: null })
  resetToken: string | null;

  @Column({ type: 'boolean', name: 'is_reset', default: false })
  isReset: boolean;
}
