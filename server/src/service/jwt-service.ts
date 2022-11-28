import { UserDto } from '../dtos/user-dto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../exeptions/api-error';
import { IChangeEmailToken } from '../interfaces/token-interface';
import { IGoogleDto } from '../interfaces/user-interface';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

class JWTService {
  generateAccessTokenToken(payload: UserDto): ITokens {
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: '16h' });

    const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateRefreshToken(token): UserDto {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      return userData as UserDto;
    } catch (e) {
      return null;
    }
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
      const { payload } = jwt.verify(token, process.env.JWT_CHANGE_PASSWORD_SECRET) as JwtPayload;
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

  validateChangeEmailToken(token: string): IChangeEmailToken {
    try {
      const { payload } = jwt.verify(token, process.env.JWT_CHANGE_EMAIL_SECRET) as JwtPayload;

      return payload as IChangeEmailToken;
    } catch (_) {
      throw ApiError.BadRequest(`Токен неверный или устарел`);
    }
  }

  generateChangeEmailToken(user_id: string): string {
    const payload: IChangeEmailToken = { user_id, isChangeEmail: true };
    const token = jwt.sign({ payload }, process.env.JWT_CHANGE_EMAIL_SECRET, { expiresIn: '20m' });

    return token;
  }

  validateGoogleRegistrationToken(token: string): IGoogleDto {
    try {
      const { payload } = jwt.verify(token, process.env.JWT_GOOGLE_REGISTRATION_SECRET) as JwtPayload;
      if (!payload) {
        throw ApiError.BadRequest(`Токен неверный или устарел`);
      }

      return payload as IGoogleDto;
    } catch (err) {
      throw err;
    }
  }

  generateGoogleRegistrationToken(payload: IGoogleDto) {
    const token = jwt.sign({ payload }, process.env.JWT_GOOGLE_REGISTRATION_SECRET, { expiresIn: '20m' });

    return token;
  }
}

export default new JWTService();
