import { UserDto } from '../dtos/user-dto';
import jwt from 'jsonwebtoken';

class TokenService {
  generateAccessTokenToken(payload: UserDto): string {
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });

    return accessToken;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
