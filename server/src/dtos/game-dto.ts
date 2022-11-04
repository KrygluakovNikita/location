import { PaymentType } from '../database/entity/Game';

export interface IGame {
  user_id: string;
  date: Date;
  hours: string;
  payment_type: PaymentType;
}
