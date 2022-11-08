import { PaymentType } from '../database/entity/Game';

export interface IGame {
  userId: string;
  date: Date;
  hours: string;
  paymentType: PaymentType;
}
