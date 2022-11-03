import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, Column, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity({ name: 'token' })
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  token_id: string;

  @OneToOne(() => User, user => user.refreshToken, { nullable: false })
  @JoinColumn()
  user: User;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;
}
