import { User } from '../database/entity/User';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { IUser, UserDto } from '../dtos/user-dto';
import tokenService from '../service/token-service';
import mailService from '../service/mail-service';
import ApiError from '../exeptions/api-error';

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

    const hashPassword = await bcrypt.hash(dto.password, 3);
    const activationLink: string = uuid.v4();

    const dbUser = new User();
    dbUser.city = dto.city;
    dbUser.password = hashPassword;
    dbUser.activationLink = activationLink;
    dbUser.photo = dto.photo;
    dbUser.email = dto.email;
    dbUser.nickname = dto.nickname;

    const user = await dbUser.save();

    const url = `${process.env.API_URL}/api/auth/activate/`;
    await mailService.sendActivationMail(dto.email, url + activationLink);
    const userData = await this.updateTokens(user);

    return { ...userData };
  }

  async activate(activationLink) {
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

    return { ...userData };
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
}

export default new UserService();
