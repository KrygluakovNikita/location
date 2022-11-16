import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, JoinColumn, BaseEntity, Column, OneToOne } from 'typeorm';

import { User } from './User';

@Entity({ name: 'token' })
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'token_id' })
  tokenId: string;

  @OneToOne(() => User, user => user.resetToken, { nullable: false })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column({ type: 'varchar', length: 6, unique: true })
  pin: string;

  @Column({ type: 'text', name: 'token', default: null })
  token: string | null;

  @Column({ type: 'boolean', name: 'is_reset_password', default: false })
  isResetPassword: boolean;

  @Column({ type: 'boolean', name: 'is_change_password', default: false })
  isChangePassword: boolean;

  @Column({ type: 'boolean', name: 'is_change_email', default: false })
  isChangeEmail: boolean;
}
