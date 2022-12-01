import { NextFunction, Response } from 'express';
import { UserRole } from '../database/entity';
import { UserDto } from '../dtos/user-dto';
import ApiError from '../exeptions/api-error';
import { IGoogleDto, IGoogleRequest, IUserRequest } from '../interfaces/user-interface';
import jwtService from '../service/jwt-service';

export function isRegistrationToken(req: IGoogleRequest, res: Response, next: NextFunction) {
  try {
    const { registrationToken } = req.cookies;

    if (!registrationToken) {
      return next(ApiError.InvalidToken());
    }

    const userData = jwtService.validateGoogleRegistrationToken(registrationToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData as IGoogleDto;

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

export function clearCookie(_: IUserRequest, res: Response, next: NextFunction) {
  res.clearCookie('refreshToken');
  res.clearCookie('serverUserData');
  res.clearCookie('registrationToken');
  return next();
}
