import { Card } from '../database/entity/Card';
import { Comment } from '../database/entity/Comment';
import { Game } from '../database/entity/Game';
import { Like } from '../database/entity/Like';
import { Post } from '../database/entity/Post';
import { User, UserRole } from '../database/entity/User';

export class UserDto {
  email: string;
  userId: string;
  isActivated: boolean;
  nickname: string;
  role: UserRole;
  photo: string;
  constructor(model: User) {
    this.email = model.email;
    this.userId = model.userId;
    this.isActivated = model.isActivated;
    this.photo = model.photo;
    this.nickname = model.nickname;
    this.role = model.role;
  }
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
