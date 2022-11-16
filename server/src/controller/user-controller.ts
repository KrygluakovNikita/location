import { IChangePassword, IUpdateEmail } from './../interfaces/token-interface';
import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';
import { validationResult } from 'express-validator';
import ApiError from '../exeptions/api-error';
import { IUser, IUserRequest } from '../interfaces/user-interface';
import { IChangeEmail, IResetPassword } from '../interfaces/token-interface';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }

      const { email, password, nickname, city } = req.body as IUser;
      const photo = req.file.filename;

      const userDto: IUser = { email, password, nickname, city, photo };

      const userData = await userService.registration(userDto);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

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
}

export default new UserController();
