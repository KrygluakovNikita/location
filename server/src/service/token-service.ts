import { UserDto } from '../dtos/user-dto';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
      const userData = jwt.sign({ payload }, process.env.JWT_RESET_SECRET, { expiresIn: '30m' });

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateResetToken(token: string): UserDto | null {
    try {
      const { payload: userData } = jwt.verify(token, process.env.JWT_RESET_SECRET) as JwtPayload;

      return userData as UserDto;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
