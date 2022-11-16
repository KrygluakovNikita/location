import { UserDto } from '../dtos/user-dto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Token, User } from '../database/entity';
import ApiError from '../exeptions/api-error';
import UserError from '../exeptions/user-error';
import { Equal } from 'typeorm';
import { IUserToken } from '../interfaces/token-interface';

class TokenService {
  generateAccessTokenToken(payload: UserDto): string {
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: '16h' });

    return accessToken;
  }

  validateAccessToken(token: string): UserDto | null {
    try {
      const { payload: userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as JwtPayload;

      return userData as UserDto;
    } catch (e) {
      return null;
    }
  }

  createResetLink(payload: UserDto): string | null {
    try {
      const userData = jwt.sign({ payload }, process.env.JWT_RESET_PASSWORD_SECRET, { expiresIn: '30m' });

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateResetPasswordToken(token: string): UserDto | null {
    try {
      const { payload } = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET) as JwtPayload;
      if (!payload) {
        throw ApiError.BadRequest(`Токен неверный или устарел`);
      }

      return payload as UserDto;
    } catch (e) {
      return null;
    }
  }

  validateChangePasswordToken(token: string): UserDto | null {
    try {
      const { payload } = jwt.verify(token, process.env.JWT_CHANGE_PASSWORD_SECRET) as JwtPayload;
      if (!payload) {
        throw ApiError.BadRequest(`Токен неверный или устарел`);
      }

      return payload as UserDto;
    } catch (e) {
      return null;
    }
  }

  generateResetPasswordToken(userDto: UserDto) {
    const payload = { ...userDto, isReset: true };
    const accessToken = jwt.sign({ payload }, process.env.JWT_RESET_PASSWORD_SECRET, { expiresIn: '20m' });

    return accessToken;
  }

  generateChangePasswordToken(userDto: UserDto) {
    const payload = { ...userDto, isReset: true };
    const accessToken = jwt.sign({ payload }, process.env.JWT_CHANGE_PASSWORD_SECRET, { expiresIn: '20m' });

    return accessToken;
  }

  async verificationResetPin(pin: string, email: string): Promise<string> {
    try {
      const { token: resetToken, user } = await this.findToken(pin, email);

      if (!resetToken.isResetPassword) {
        throw ApiError.BadRequest('Вы не можете восстановить пароль, так как вы выбрали другую операцию');
      }

      const userDto = new UserDto(user);

      const token = this.generateResetPasswordToken(userDto);

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

      const changePasswordToken = this.generateChangePasswordToken(userDto);

      await Token.delete(token.tokenId);

      return changePasswordToken;
    } catch (err) {
      if (err instanceof ApiError || err instanceof UserError) {
        throw err;
      }

      throw ApiError.BadRequest('Не предвиденная ошибка');
    }
  }
}

export default new TokenService();
