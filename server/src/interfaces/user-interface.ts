import { Request } from 'express';
import { Card, Game, UserRole } from '../database/entity';
import { CommentDto } from '../dtos/comment-dto';
import { GameDto } from '../dtos/game-dto';
import { LikeDto } from '../dtos/like-dto';
import { PostDto } from '../dtos/post-dto';
import { UserDto } from '../dtos/user-dto';
import { IClientData } from '../service/user-service';
import { IRegistrationToken } from './token-interface';

export interface IUserRequest extends Request {
  user: UserDto;
}
export interface IGoogleRequest extends Request {
  user: IGoogleDto;
}

export interface IRTRequest extends Request {
  user?: {
    userData?: IClientData | null;
    refreshToken?: string | null;
    registrationToken?: IRegistrationToken | null;
  } | null;
}

export interface CardDto {
  cardId: string;
  card_number: number;
  mmyy: string;
  cvv: number;
}

export interface IUser {
  userId?: string;

  games?: GameDto[] | null;

  cards?: CardDto[] | null;

  likes?: LikeDto[] | null;

  posts?: PostDto[] | null;

  comments?: CommentDto[] | null;

  photo?: string | null;

  role?: UserRole;

  activationLink?: string | null;

  isActivated?: boolean;

  email: string;

  password: string;

  nickname: string;

  city: string;
}

export interface IGoogleDto {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface IGoogleRegistration {
  nickname: string;
  city: string;
  photo: string;
  registrationToken: string;
}
