import { Game, PaymentType } from '../database/entity';
import { UserDto } from './user-dto';

export class GameDto {
  gameId: string;
  user: UserDto;
  date: Date;
  createdAt: Date;
  hours: string;
  paymentType: PaymentType;
  isPayed: boolean;
  constructor(model: Game) {
    this.createdAt = model.createdAt;
    this.gameId = model.gameId;
    this.isPayed = model.isPayed;
    this.user = new UserDto(model.user);
    this.date = model.date;
    this.hours = model.hours;
    this.paymentType = model.paymentType;
  }
}

export class GameDtoWithQr extends GameDto {
  qrCode: string;
  constructor(model: Game, qrCode: string) {
    super(model);
    this.qrCode = qrCode;
  }
}
