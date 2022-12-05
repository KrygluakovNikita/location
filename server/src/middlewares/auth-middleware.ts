import { NextFunction, Response } from 'express';
import { UserRole } from '../database/entity';
import { UserDto } from '../dtos/user-dto';
import ApiError from '../exeptions/api-error';
import { IUserRequest } from '../interfaces/user-interface';
import jwtService from '../service/jwt-service';

export function isAuth(req: IUserRequest, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = jwtService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData as UserDto;

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}

export function isAdmin(req: IUserRequest, res: Response, next: NextFunction) {
  if (req.user.role !== UserRole.ADMIN) {
    throw ApiError.AccessDenied();
  }
  return next();
}
