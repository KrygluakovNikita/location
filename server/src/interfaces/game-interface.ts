import { PaymentType } from '../database/entity';

export interface IGame {
  userId: string;
  date: Date;
  hours: string;
  paymentType: PaymentType;
  equipmentId: string;
}
