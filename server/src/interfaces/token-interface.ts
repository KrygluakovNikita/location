import { Token, User } from '../database/entity';

export interface IResetPassword {
  newPassword: string;
  resetToken: string;
}

export interface IUserToken {
  token: Token;
  user: User;
}
