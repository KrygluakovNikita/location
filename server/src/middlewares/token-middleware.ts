import { NextFunction, Response } from 'express';
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
      return next(ApiError.InvalidToken());
    }
    req.user = userData as IGoogleDto;

    next();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    return next(ApiError.ServerError());
  }
}

export function clearCookie(_: IUserRequest, res: Response, next: NextFunction) {
  res.clearCookie('refreshToken');
  res.clearCookie('serverUserData');
  res.clearCookie('registrationToken');
  return next();
}
