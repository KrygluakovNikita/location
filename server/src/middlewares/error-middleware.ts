import { Request, Response, NextFunction } from 'express';
import ApiError from '../exeptions/api-error';
import PhotoError from '../exeptions/photo-error';

type TError = PhotoError | ApiError;

export default function (err, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  if (err instanceof PhotoError || err instanceof PhotoError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: err.message ?? 'Непредвиденная ошибка' });
}
