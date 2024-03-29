import { IChangePassword, IUpdateEmail } from './../interfaces/token-interface';
import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';
import { validationResult } from 'express-validator';
import ApiError from '../exeptions/api-error';
import { IGoogleRegistration, IUser, IUserRequest } from '../interfaces/user-interface';
import { IChangeEmail, IResetPassword } from '../interfaces/token-interface';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }

      const { email, password, nickname, city } = req.body as IUser;

      const userDto: IUser = { email, password, nickname, city };

      const { userData, refreshToken } = await userService.registration(userDto);

      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { userData, refreshToken } = await userService.login(email, password);

      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('refreshToken', { path: '/' });
      res.clearCookie('serverUserData');

      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken: token } = req.cookies;
      const { userData, refreshToken } = await userService.refresh(token);

      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      await userService.resetPassword(email);

      return res.status(200).end();
    } catch (e) {
      next(e);
    }
  }

  async verificationResetPin(req: Request, res: Response, next: NextFunction) {
    try {
      const { pin, email } = req.body;
      const data = await userService.verificationResetPin(pin, email);

      return res.json(data).status(200);
    } catch (e) {
      next(e);
    }
  }

  async updateResetedPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { newPassword, resetToken } = req.body as IResetPassword;
      const dto: IResetPassword = { newPassword, resetToken };

      const data = await userService.updateResetPassword(dto);

      return res.json(data).status(200);
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { email } = req.user;
      await userService.changePassword(email);

      return res.status(200).end();
    } catch (e) {
      next(e);
    }
  }

  async changeUserData(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { newPassword, newEmail, newCity } = req.body;
      const { userId } = req.user;
      const data = await userService.updateUserData(userId, { newPassword, newEmail, newCity });

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async verificationChangePasswordPin(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { pin } = req.body;
      const { email } = req.user;
      const data = await userService.verificationChangePasswordPin(pin, email);

      return res.json(data).status(200);
    } catch (e) {
      next(e);
    }
  }

  async updateChangedPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { changeToken, newPassword } = req.body as IChangePassword;
      const dto: IChangePassword = { newPassword, changeToken };

      const data = await userService.updateChangePassword(dto);

      return res.json(data).status(200);
    } catch (e) {
      next(e);
    }
  }

  async changeEmail(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;
      const { userId } = req.user;

      const data = await userService.changeEmail(userId, password);

      return res.json(data).end();
    } catch (e) {
      next(e);
    }
  }

  async updateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newEmail } = req.body as IChangeEmail;
      const dto: IChangeEmail = { token, newEmail };

      await userService.updateEmail(dto);

      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async verificationChangeEmailPin(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { pin, newEmail } = req.body;
      const { email: previousEmail } = req.user;

      const dto: IUpdateEmail = { pin, previousEmail, newEmail };
      const data = await userService.verificationChangeEmailPin(dto);

      return res.json(data).status(200);
    } catch (e) {
      next(e);
    }
  }

  async registrationForGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname, city } = req.body;

      const { registrationToken } = req.cookies;

      const dto: IGoogleRegistration = { nickname, city, registrationToken };

      const { userData, refreshToken } = await userService.registrationForGoogle(dto);

      res.clearCookie('registrationToken');

      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData).status(200);
    } catch (e) {
      next(e);
    }
  }

  async updatePhoto(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const newPhoto = req.file?.filename;

      await userService.updatePhoto(userId, newPhoto);

      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async deletePhoto(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;

      await userService.deletePhoto(userId);

      return res.end();
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
