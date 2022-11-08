import { Request, Response, NextFunction } from 'express';
import ApiError from '../exeptions/api-error';
import UserError from '../exeptions/user-error';

export default function (err, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  if (err instanceof ApiError || err instanceof UserError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: err.message ?? 'Непредвиденная ошибка' });
}
