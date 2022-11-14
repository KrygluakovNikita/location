import { User, UserRole } from '../database/entity/User';

export class UserDto {
  email: string;
  userId: string;
  role: UserRole;
  isActivated: boolean;
  nickname: string;
  constructor(model: User) {
    this.nickname = model.nickname;
    this.isActivated = model.isActivated;
    this.email = model.email;
    this.userId = model.userId;
    this.role = model.role;
  }
}
