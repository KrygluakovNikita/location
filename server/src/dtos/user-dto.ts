import { User, UserRole } from '../database/entity/User';

export class UserDto {
  email: string;
  userId: string;
  role: UserRole;
  constructor(model: User) {
    this.email = model.email;
    this.userId = model.userId;
    this.role = model.role;
  }
}
