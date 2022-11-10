import { User, ResetToken } from '../database/entity';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { UserDto } from '../dtos/user-dto';
import tokenService from '../service/token-service';
import mailService from '../service/mail-service';
import ApiError from '../exeptions/api-error';
import { IUser } from '../interfaces/user-interface';
import { IResetPassword, IResetToken } from '../interfaces/token-interface';

export interface IClientData {
  accessToken: string;
  user: UserDto;
}

class UserService {
  async registration(dto: IUser): Promise<IClientData> {
    const candidate = await User.findOneBy({ email: dto.email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${dto.email} уже зарегистирован`);
    }

    const hashPassword = await this.hashPassword(dto.password);
    const activationLink: string = uuid.v4();

    const dbUser = new User();
    dbUser.city = dto.city;
    dbUser.password = hashPassword;
    dbUser.activationLink = activationLink;
    dbUser.photo = dto.photo;
    dbUser.email = dto.email;
    dbUser.nickname = dto.nickname;

    const user = await dbUser.save();

    await mailService.sendActivationMail(dto.email, activationLink);
    const userData = await this.updateTokens(user);

    return { ...userData };
  }

  async activate(activationLink: string): Promise<void> {
    const user = await User.findOneBy({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка авторизации');
    }

    user.isActivated = true;
    user.save();
  }

  async login(email: string, password: string): Promise<IClientData> {
    const user = await User.findOneBy({ email: email });
    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    const userData = await this.updateTokens(user);

    return userData;
  }

  async updateTokens(user: User): Promise<IClientData> {
    const userDto = new UserDto(user);
    const accessToken = tokenService.generateAccessTokenToken(userDto);

    return { accessToken, user: userDto };
  }

  async getAllUsers(): Promise<User[]> {
    const users = await User.find();

    return users;
  }

  async resetPassword(email: string) {
    const { userId } = await User.findOneBy({ email });
    if (!userId) {
      throw ApiError.BadRequest(`Пользователя с такой почтой: ${email} не существует`);
    }

    const resetPin = tokenService.createPinCode();

    const resetToken = new ResetToken();
    resetToken.userId = userId;
    resetToken.pin = resetPin;
    await resetToken.save();

    await mailService.resetPassword(email, resetPin);
  }

  async verificationResetPin(pin: string): Promise<IResetToken> {
    const resetToken = await tokenService.verificationResetPin(pin);

    return resetToken;
  }

  async updatePassword({ resetToken, newPassword }: IResetPassword): Promise<UserDto> {
    const token = await ResetToken.findOneBy({ resetToken });
    if (!token) {
      throw ApiError.BadRequest(`Не верный токен для восстановления пароля`);
    }

    const user = await User.findOneBy({ userId: token.userId });

    await ResetToken.delete(token.resetId);

    user.password = await this.hashPassword(newPassword);

    await user.save();

    const userDto = new UserDto(user);

    return userDto;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 3);
  }
}

export default new UserService();
