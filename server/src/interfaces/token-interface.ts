import { Token, User } from '../database/entity';

export interface IResetPassword {
  newPassword: string;
  resetToken: string;
}

export interface IUserToken {
  token: Token;
  user: User;
}

export interface IChangeEmailToken {
  user_id: string;
  isChangeEmail: boolean;
}

export interface IToken {
  token: string;
}

export interface IChangeEmail {
  newEmail: string;
  token: string;
}

export interface IUpdateEmail {
  pin: string;
  previousEmail: string;
  newEmail: string;
}
