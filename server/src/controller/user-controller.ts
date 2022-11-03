import { User } from './../database/entity/User';
import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';
import { IUser } from '../dtos/user-dto';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, nickname, city, photo } = req.body;
      const userDto: IUser = { email, password, nickname, city, photo };
      const userData = await userService.registration(userDto);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });

      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }
  async login(req, res, next) {
    try {
    } catch (e) {}
  }
  async logout(req, res, next) {
    try {
    } catch (e) {}
  }
  async activate(req, res, next) {
    try {
    } catch (e) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (e) {}
  }
  async getUsers(req, res, next) {
    try {
      res.json(User.find());
    } catch (e) {}
  }
}

module.exports = new UserController();
