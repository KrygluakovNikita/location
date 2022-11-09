import { Request } from 'express';
import { Card, Comment, Game, Like, Post, UserRole } from '../database/entity';
import { UserDto } from '../dtos/user-dto';

export interface IUserRequest extends Request {
  user: UserDto;
}

export interface IUser {
  userId?: string;

  games?: Game[] | null;

  cards?: Card[] | null;

  likes?: Like[] | null;

  posts?: Post[] | null;

  comments?: Comment[] | null;

  photo?: string;

  role?: UserRole;

  activationLink?: string | null;

  isActivated?: boolean;

  email: string;

  password: string;

  nickname: string;

  city: string;
}
