import { Card } from '../database/entity/Card';
import { Comment } from '../database/entity/Comment';
import { Game } from '../database/entity/Game';
import { Like } from '../database/entity/Like';
import { Post } from '../database/entity/Post';
import { Token } from '../database/entity/Token';
import { User, UserRole } from '../database/entity/User';

export class UserDto {
  email: string;
  id: string;
  isActivated: boolean;
  constructor(model: User) {
    this.email = model.email;
    this.id = model.user_id;
    this.isActivated = model.isActivated;
  }
}

export interface IUser {
  user_id?: string;

  games?: Game[] | null;

  cards?: Card[] | null;

  likes?: Like[] | null;

  posts?: Post[] | null;

  comments?: Comment[] | null;

  refreshToken?: Token | null;

  photo?: string;

  role?: UserRole;

  activationLink?: string | null;

  isActivated?: boolean;

  email: string;

  password: string;

  nickname: string;

  city: string;
}
