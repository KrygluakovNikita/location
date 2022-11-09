import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';
import { validationResult } from 'express-validator';
import ApiError from '../exeptions/api-error';
import { IUser } from '../interfaces/user-interface';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
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

      return res.json({ message: '' });
    } catch (e) {
      next(e);
    }
  }

  async resetToken(req: Request, res: Response, next: NextFunction) {
    try {
      const resetToken = req.params.token;
      const data = await userService.resetToken(resetToken);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
