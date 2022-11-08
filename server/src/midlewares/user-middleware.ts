import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../database/entity/User';
import ApiError from '../exeptions/api-error';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user.role !== UserRole.ADMIN) {
    throw ApiError.AccessDenied();
  }
  return next();
}
