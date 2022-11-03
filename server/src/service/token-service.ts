import { User } from '../database/entity/User';
import { UserDto } from '../dtos/user-dto';
const jwt = require('jsonwebtoken');
const { Token } = require('../database/entity/Token');

// const UserDto;
class TokenService {
  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(user_id: string, refreshToken: string) {
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
}

export default new TokenService();
