import { UserDto } from '../dtos/user-dto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Token, User } from '../database/entity';
import ApiError from '../exeptions/api-error';
import UserError from '../exeptions/user-error';
import { Equal } from 'typeorm';
import { IChangeEmailToken, IUserToken } from '../interfaces/token-interface';

class TokenService {
  generateAccessTokenToken(payload: UserDto): string {
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: '16h' });

    return accessToken;
  }

  validateAccessToken(token: string): UserDto {
    try {
      const { payload } = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as JwtPayload;

      return payload as UserDto;
    } catch (_) {
      throw ApiError.BadRequest(`Токен неверный или устарел`);
    }
  }

  createResetLink(payload: UserDto): string {
    try {
      const userData = jwt.sign({ payload }, process.env.JWT_RESET_PASSWORD_SECRET, { expiresIn: '30m' });

      return userData;
    } catch (_) {
      throw ApiError.BadRequest(`Токен неверный или устарел`);
    }
  }

  validateResetPasswordToken(token: string): UserDto {
    try {
      const { payload } = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET) as JwtPayload;

      return payload as UserDto;
    } catch (_) {
      throw ApiError.BadRequest(`Токен неверный или устарел`);
    }
  }

  validateChangePasswordToken(token: string): UserDto {
    try {
      console.log(token);
      console.log(process.env.JWT_CHANGE_PASSWORD_SECRET);

      const { payload } = jwt.verify(token, process.env.JWT_CHANGE_PASSWORD_SECRET) as JwtPayload;
      console.log(payload);
      if (!payload) {
        throw ApiError.BadRequest(`Токен неверный или устарел`);
      }

      return payload as UserDto;
    } catch (err) {
      throw err;
    }
  }

  generateResetPasswordToken(payload: UserDto) {
    const token = jwt.sign({ payload }, process.env.JWT_RESET_PASSWORD_SECRET, { expiresIn: '20m' });

    return token;
  }

  generateChangePasswordToken(payload: UserDto) {
    const token = jwt.sign({ payload }, process.env.JWT_CHANGE_PASSWORD_SECRET, { expiresIn: '20m' });

    return token;
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

  validateChangeEmailToken(token: string): IChangeEmailToken {
    try {
      const { payload } = jwt.verify(token, process.env.JWT_CHANGE_EMAIL_SECRET) as JwtPayload;

      return payload as IChangeEmailToken;
    } catch (_) {
      throw ApiError.BadRequest(`Токен неверный или устарел`);
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

  generateChangeEmailToken(user_id: string): string {
    const payload: IChangeEmailToken = { user_id, isChangeEmail: true };
    const token = jwt.sign({ payload }, process.env.JWT_CHANGE_EMAIL_SECRET, { expiresIn: '20m' });

    return token;
  }
}

export default new TokenService();
