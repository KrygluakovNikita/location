import { UserDto } from '../dtos/user-dto';
import { RefreshToken, Token, User } from '../database/entity';
import ApiError from '../exeptions/api-error';
import UserError from '../exeptions/user-error';
import { Equal } from 'typeorm';
import { IUserToken } from '../interfaces/token-interface';
import jwtService from './jwt-service';

class TokenService {
  async verificationResetPin(pin: string, email: string): Promise<string> {
    try {
      const { token: resetToken, user } = await this.findToken(pin, email);

      if (!resetToken.isResetPassword) {
        throw ApiError.BadRequest('Вы не можете восстановить пароль, так как вы выбрали другую операцию');
      }

      const userDto = new UserDto(user);

      const token = jwtService.generateResetPasswordToken(userDto);

      await Token.delete(resetToken.tokenId);

      return token;
    } catch (err) {
      if (err instanceof ApiError || err instanceof UserError) {
        throw err;
      }

      throw ApiError.BadRequest('Не предвиденная ошибка');
    }
  }

  async findToken(pin: string, email: string): Promise<IUserToken> {
    const token = await Token.findOne({
      where: { pin: Equal(pin) },
      relations: {
        user: true,
      },
    });

    if (!token) {
      throw ApiError.BadRequest(`Не верный пин код`);
    }

    const user = await User.findOneBy({ userId: token.user.userId });
    if (user.email !== email) {
      throw UserError.NotAllow();
    }

    return { token, user };
  }

  async verificationChangePasswordPin(pin: string, email: string): Promise<string> {
    try {
      const { token, user } = await this.findToken(pin, email);

      if (!token.isChangePassword) {
        throw ApiError.BadRequest('Вы не можете изменить пароль, так как вы выбрали другую операцию');
      }

      const userDto = new UserDto(user);

      const changePasswordToken = jwtService.generateChangePasswordToken(userDto);

      await Token.delete(token.tokenId);

      return changePasswordToken;
    } catch (err) {
      if (err instanceof ApiError || err instanceof UserError) {
        throw err;
      }

      throw ApiError.BadRequest('Не предвиденная ошибка');
    }
  }

  async validateChangeEmailPin(pin, email): Promise<boolean> {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const token = await Token.findOne({ where: { pin, user: Equal(user.userId) } });
    if (!token) {
      throw ApiError.BadRequest(`Неверный токен`);
    }
    await Token.delete(token.tokenId);

    return true;
  }
}

export default new TokenService();
