// import { Request, Response, NextFunction } from 'express';

import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../database/entity/User';
import { UserDto } from '../dtos/user-dto';
import ApiError from '../exeptions/api-error';
import tokenService from '../service/token-service';

export interface IGetRoleInfoRequest extends Request {
  user: UserDto; // or any other type
}

export function isAuth(req: IGetRoleInfoRequest, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const { payload: userData } = tokenService.validateAccessToken(accessToken) as JwtPayload;

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData as UserDto;

    next();
  } catch (e) {
    console.log('error');

    return next(ApiError.UnauthorizedError());
  }
}

export function isAdmin(req: IGetRoleInfoRequest, res: Response, next: NextFunction) {
  if (req.user.role !== UserRole.ADMIN) {
    throw ApiError.AccessDenied();
  }
  return next();
}
