import { User } from '../database/entity/User';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { IUser, UserDto } from '../dtos/user-dto';
import tokenService from '../service/token-service';
import mailService from '../service/mail-service';

class UserService {
  async registration(dto: IUser) {
    const candidate = await User.findOneBy({ email: dto.email });
    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${dto.email} уже зарегистирован`);
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

    const url = `${process.env.API_URL}/api/activate/`;
    await mailService.sendActivationMail(dto.email, url + activationLink);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await User.findOneBy({ activationLink });
    if (!user) {
      throw new Error('Неккоректная ссылка авторизации');
    }
    user.isActivated = true;
    user.save();
  }
}

export default new UserService();
