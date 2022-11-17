import { User, Token } from '../database/entity';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { UserDto } from '../dtos/user-dto';
import tokenService from '../service/token-service';
import mailService from '../service/mail-service';
import ApiError from '../exeptions/api-error';
import { IGoogleDto, IUser } from '../interfaces/user-interface';
import { IChangeEmail, IChangePassword, IResetPassword, IToken, IUpdateEmail } from '../interfaces/token-interface';
import { Equal } from 'typeorm';
import Puid from 'puid';
import UserError from '../exeptions/user-error';
import jwtService from './jwt-service';

export interface IClientData {
  accessToken: string;
  user: UserDto;
}

class UserService {
  async registration(dto: IUser): Promise<IClientData> {
    const candidate = await User.findOne({ where: [{ email: dto.email }, { nickname: dto.nickname }] });
    if (candidate) {
      throw UserError.UniqValues();
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
      throw UserError.UserNotFound();
    }

    const isPasswordsEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordsEquals) {
      throw UserError.IncorrectPassword();
    }

    const userData = await this.updateTokens(user);

    return userData;
  }

  async updateTokens(user: User): Promise<IClientData> {
    const userDto = new UserDto(user);
    const accessToken = jwtService.generateAccessTokenToken(userDto);

    return { accessToken, user: userDto };
  }

  async getAllUsers(): Promise<User[]> {
    const users = await User.find();

    return users;
  }

  async resetPassword(email: string) {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw UserError.UserNotFound();
    }

    let resetToken = new Token();

    const token = await Token.findOneBy({ user: Equal(user.userId) });
    if (token) {
      await Token.delete(token.tokenId);
    }

    const resetPin = this.generatePinCode();

    resetToken.user = user;
    resetToken.pin = resetPin;
    resetToken.isResetPassword = true;

    await resetToken.save();

    await mailService.resetPassword(email, resetPin);
  }

  async verificationResetPin(pin: string, email: string): Promise<IToken> {
    const token = await tokenService.verificationResetPin(pin, email);

    return { token };
  }

  async updateResetPassword({ resetToken, newPassword }: IResetPassword): Promise<UserDto> {
    try {
      const payload = jwtService.validateResetPasswordToken(resetToken);

      const userDto = await this.updatePassword(payload, newPassword);

      return userDto;
    } catch (err) {
      if (err instanceof ApiError || err instanceof UserError) throw err;

      throw ApiError.ServerError();
    }
  }

  async updatePassword(userDto: UserDto, newPassword: string) {
    const user = await User.findOneBy({ userId: userDto.userId });

    user.password = await this.hashPassword(newPassword);

    await user.save();

    const result = new UserDto(user);

    return result;
  }

  async changePassword(email: string) {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw UserError.UserNotFound();
    }

    let changeToken = new Token();

    const token = await Token.findOneBy({ user: Equal(user.userId) });
    if (token) {
      await Token.delete(token.tokenId);
    }

    const resetPin = this.generatePinCode();

    changeToken.user = user;
    changeToken.pin = resetPin;
    changeToken.isChangePassword = true;

    await changeToken.save();
    await mailService.changePassword(email, resetPin);
  }

  async verificationChangePasswordPin(pin: string, email: string): Promise<IToken> {
    const token = await tokenService.verificationChangePasswordPin(pin, email);

    return { token };
  }

  async updateChangePassword({ changeToken, newPassword }: IChangePassword): Promise<UserDto> {
    const token = jwtService.validateChangePasswordToken(changeToken);

    const userDto = await this.updatePassword(token, newPassword);

    return userDto;
  }

  async changeEmail(userId: string, password: string): Promise<IToken> {
    const user = await User.findOneBy({ userId });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const isPasswordsEquals = bcrypt.compare(password, user.password);
    if (!isPasswordsEquals) {
      throw UserError.IncorrectPassword();
    }

    const token = jwtService.generateChangeEmailToken(userId);

    return { token };
  }

  async updateEmail({ token, newEmail }: IChangeEmail): Promise<void> {
    const data = jwtService.validateChangeEmailToken(token);
    //check token and exteptions

    if (!data.isChangeEmail) {
      throw ApiError.BadRequest('Вы не можете изменить почту');
    }

    const user = await User.findOneBy({ userId: data.user_id });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const pin = this.generatePinCode();

    const changeToken = new Token();
    const previousToken = await Token.findOneBy({ user: Equal(user.userId) });
    if (previousToken) {
      await Token.delete(previousToken.tokenId);
    }

    changeToken.user = user;
    changeToken.pin = pin;
    changeToken.isChangePassword = true;

    changeToken.save();

    await mailService.changeEmail(newEmail, pin);

    return;
  }

  async verificationChangeEmailPin({ pin, previousEmail, newEmail }: IUpdateEmail): Promise<UserDto> {
    const isPass = tokenService.validateChangeEmailPin(pin, previousEmail);
    if (!isPass) {
      throw ApiError.BadRequest('Ошибка при обновлении почты');
    }

    const candidate = await User.findOneBy({ email: newEmail });
    if (candidate) {
      throw UserError.UniqValues();
    }

    const user = await User.findOne({ where: { email: previousEmail } });
    user.isActivated = true;
    user.email = newEmail;

    await user.save();

    const userDto = new UserDto(user);

    return userDto;
  }

  generatePinCode(): string {
    const puid = new Puid();
    const pin = puid.generate().slice(3, 9);

    return pin;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 3);
  }

  async findOrCreateForGoogle(googleDto: IGoogleDto) {
    const candidate = await User.findOne({ where: { googleId: googleDto.sub } });
    if (!candidate) {
      return 'token_for_registration';
    }
    const userDto = this.updateTokens(candidate);

    return userDto;
  }
}

export default new UserService();
