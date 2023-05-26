import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Game } from './Game';

@Entity({ name: 'equipment' })
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'equipment_id' })
  equipmentId: string;

  @Column({ type: 'int', nullable: false })
  count: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  price: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('boolean', { default: false })
  disabled: boolean;

  @Column({ type: 'timestamptz', default: new Date() }) // Recommended
  createdAt: Date;

  @OneToMany(() => Game, game => game.equipment, { nullable: true })
  @JoinColumn({ name: 'games' })
  games: Game[];
}
