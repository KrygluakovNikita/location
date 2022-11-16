export interface IResetToken {
  Token: string;
}

export interface IResetPassword {
  newPassword: string;
  resetToken: string;
}
