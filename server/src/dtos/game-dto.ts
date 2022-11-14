import { Game, PaymentType } from '../database/entity';
import { UserDto } from './user-dto';

export class GameDto {
  user: UserDto;
  date: Date;
  hours: string;
  paymentType: PaymentType;
  constructor(model: Game) {
    this.user = new UserDto(model.user);
    this.date = model.date;
    this.hours = model.hours;
    this.paymentType = model.paymentType;
  }
}
