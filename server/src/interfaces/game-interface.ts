import { PaymentType } from '../database/entity';

export interface IGame {
  userId: string;
  date: Date;
  hours: string;
  paymentType: PaymentType;
  equipmentId: string;
}

export enum StatChartEnum {
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export interface IStatChart {
  type: StatChartEnum;
  startDate: Date;
  equipment?: string;
}
