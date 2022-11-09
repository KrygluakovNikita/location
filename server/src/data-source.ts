import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Card, Comment, Game, Like, Post, User } from './database/entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.DOCKER_POSTGRES_PORTS!,
  username: process.env.DOCKER_POSTGRES_USER,
  password: process.env.DOCKER_POSTGRES_PASSWORD,
  database: process.env.DOCKER_POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User, Post, Like, Comment, Game, Card],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  subscribers: ['src/database/subscribers/**/*{.ts,.js}'],
});
