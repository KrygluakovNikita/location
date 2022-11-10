export interface IResetToken {
  resetToken: string;
}

export interface IResetPassword {
  newPassword: string;
  resetToken: string;
}
