import { Token } from '../database/entity/Token';
import { User } from '../database/entity/User';
import { UserDto } from '../dtos/user-dto';
import ApiError from '../exeptions/api-error';
import jwt from 'jsonwebtoken';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

class TokenService {
  generateTokens(payload: UserDto): ITokens {
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(user_id: string, refreshToken: string): Promise<Token> {
    const tokenData = await Token.findOneBy({
      user: {
        user_id: user_id,
      },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = new Token();
    token.refreshToken = refreshToken;
    token.user = await User.findOneBy({ user_id: user_id });
    token.save();
    return token;
  }

  async removeToken(refreshToken: string) {
    const { affected } = await Token.delete({ refreshToken: refreshToken });
    if (!affected) {
      throw ApiError.BadRequest('Ошибка при удалении refreshToken');
    }
    return true;
  }

  async findToken(refreshToken: string): Promise<Token> {
    const token = await Token.findOneBy({ refreshToken: refreshToken });

    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token): UserDto {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      return userData as UserDto;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
