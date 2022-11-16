import { UserDto } from '../dtos/user-dto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IResetToken } from '../interfaces/token-interface';
import { Token, User } from '../database/entity';
import ApiError from '../exeptions/api-error';
import UserError from '../exeptions/user-error';

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

  generateResetToken(userDto: UserDto) {
    const payload = { ...userDto, isReset: true };
    const accessToken = jwt.sign({ payload }, process.env.JWT_RESET_SECRET, { expiresIn: '20m' });

    return accessToken;
  }

  async verificationResetPin(pin: string, email: string): Promise<IResetToken> {
    const resetToken = await Token.findOne({
      where: { pin },
      relations: {
        user: true,
      },
    });

    if (!resetToken) {
      throw ApiError.BadRequest(`Не верный пин код`);
    }

    const user = await User.findOneBy({ userId: resetToken.user.userId });
    if (user.email !== email) {
      throw UserError.NotAllow();
    }

    const userDto = new UserDto(user);

    const token = this.generateResetToken(userDto);

    resetToken.token = token;
    resetToken.isResetPassword = false;

    await resetToken.save();

    return { Token: token };
  }
}

export default new TokenService();
