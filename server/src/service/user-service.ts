import { User, Token, DB_DEFAULT_PHOTO } from '../database/entity';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { UserDto } from '../dtos/user-dto';
import tokenService from '../service/token-service';
import mailService from '../service/mail-service';
import ApiError from '../exeptions/api-error';
import { IGoogleDto, IGoogleRegistration, IUser } from '../interfaces/user-interface';
import { IChangeEmail, IChangePassword, IResetPassword, IToken, IUpdateEmail } from '../interfaces/token-interface';
import { Equal } from 'typeorm';
import Puid from 'puid';
import UserError from '../exeptions/user-error';
import jwtService from './jwt-service';
import { unlink } from 'fs/promises';
import path from 'path';

export interface IClientData {
  accessToken: string;
  user: UserDto;
}

export interface IServerData {
  refreshToken: string;
  userData: IClientData;
}

class UserService {
  async registration(dto: IUser): Promise<IServerData> {
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
    if (dto.photo) dbUser.photo = dto.photo;
    dbUser.email = dto.email;
    dbUser.nickname = dto.nickname;

    const user = await dbUser.save();

    await mailService.sendActivationMail(dto.email, activationLink);
    const result = await this.updateTokens(user);

    return result;
  }

  async activate(activationLink: string): Promise<void> {
    const user = await User.findOneBy({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка авторизации');
    }

    user.isActivated = true;
    user.save();
  }

  async login(email: string, password: string): Promise<IServerData> {
    const user = await User.findOneBy({ email: email });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const isPasswordsEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordsEquals) {
      throw UserError.IncorrectPassword();
    }

    const result = await this.updateTokens(user);

    return result;
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(token: string): Promise<IServerData> {
    const data = jwtService.validateRefreshToken(token);
    const tokenFromDb = await tokenService.findRefreshToken(token);
    if (!data || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findOneBy({ userId: data.userId });
    const result = await this.updateTokens(user);

    return result;
  }

  async updateTokens(user: User): Promise<IServerData> {
    const userDto = new UserDto(user);
    const { accessToken, refreshToken } = jwtService.generateAccessTokenToken(userDto);

    const result: IServerData = { refreshToken, userData: { accessToken, user: userDto } };

    return result;
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

    if (user.isGoogle) {
      throw UserError.GoogleUser();
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

    if (user.isGoogle) {
      throw UserError.GoogleUser();
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

    if (user.isGoogle) {
      throw UserError.GoogleUser();
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
    const candidate = await User.findOne({ where: [{ googleId: googleDto.sub }] });
    if (!candidate) {
      const isEmailDuplicate = await User.findOneBy({ email: googleDto.email });
      if (isEmailDuplicate) {
        throw UserError.UniqValues();
      }

      const registrationToken = jwtService.generateGoogleRegistrationToken(googleDto);

      return { registrationToken };
    }

    const userDto = this.updateTokens(candidate);

    return userDto;
  }

  async registrationForGoogle(googleDto: IGoogleRegistration) {
    const data = jwtService.validateGoogleRegistrationToken(googleDto.registrationToken);

    const candidate = await User.findOneBy({ email: data.email });
    if (candidate) {
      throw UserError.UniqValues();
    }

    const dbUser = new User();
    dbUser.city = googleDto.city;
    dbUser.isGoogle = true;
    dbUser.email = data.email;
    dbUser.nickname = googleDto.nickname;
    dbUser.googleId = data.sub;

    if (googleDto.photo) dbUser.photo = googleDto.photo;

    dbUser.isActivated = data.email_verified;
    if (!data.email_verified) {
      const activationLink: string = uuid.v4();
      dbUser.activationLink = activationLink;
      await mailService.sendActivationMail(data.email, activationLink);
    }

    const user = await dbUser.save();

    const userDto = this.updateTokens(user);
    return userDto;
  }

  async updatePhoto(userId: string, newPhoto: string): Promise<void> {
    const user = await User.findOneBy({ userId });
    if (!user) {
      throw UserError.UserNotFound();
    }

    const previousPhoto = user.photo;

    if (previousPhoto !== DB_DEFAULT_PHOTO) {
      const p = path.join(__dirname, '../../public/', previousPhoto);
      await unlink(p);

      if (newPhoto) {
        user.photo = newPhoto;
      } else {
        user.photo = DB_DEFAULT_PHOTO;
      }
    } else {
      user.photo = newPhoto;
    }

    user.save();

    return;
  }

  async deletePhoto(userId: string): Promise<void> {
    const user = await User.findOneBy({ userId });
    if (!user) {
      throw UserError.UserNotFound();
    }

    if (user.photo !== DB_DEFAULT_PHOTO) {
      const p = path.join(__dirname, '../../public/', user.photo);
      await unlink(p);

      user.photo = DB_DEFAULT_PHOTO;
    } else {
      user.photo = DB_DEFAULT_PHOTO;
    }

    user.save();
    return;
  }
}

export default new UserService();
