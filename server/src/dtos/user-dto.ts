import { User, UserRole } from '../database/entity/User';

export class UserDto {
  email: string;
  userId: string;
  role: UserRole;
  isActivated: boolean;
  nickname: string;
  photo: string;
  isGoogle?: boolean;
  activationLink: string;
  city: string;
  constructor(model: User) {
    if (model?.isGoogle) this.isGoogle = model.isGoogle;
   if (model?.photo) this.photo = model.photo;
    this.nickname = model.nickname;
    this.isActivated = model.isActivated;
    this.email = model.email;
    this.userId = model.userId;
    this.role = model.role;
    this.activationLink = model.activationLink;
    this.city = model.city;
  }
}
