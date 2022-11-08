import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './database/entity/User';
import { Post } from './database/entity/Post';
import { Comment } from './database/entity/Comment';
import { Like } from './database/entity/Like';
import { Game } from './database/entity/Game';
import { Card } from './database/entity/Card';
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
