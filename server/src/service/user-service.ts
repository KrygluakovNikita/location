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
    const activationLink = uuid.v4();

    const userDto2 = new User();
    userDto2.city = dto.city;
    userDto2.password = hashPassword;
    userDto2.activationLink = activationLink;
    userDto2.photo = dto.photo;
    userDto2.email = dto.email;
    userDto2.nickname = dto.nickname;

    const user = await userDto2.save();

    // await mailService.sendActivationMail(dto.email, activationLink);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export default new UserService();
