import { Request, Response, NextFunction } from 'express';
import gameService from '../service/game-service';
import { IGame } from '../dtos/game-dto';
import { IUserRequest } from '../middlewares/auth-middleware';

class GameController {
  async upload(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { date, hours, paymentType } = req.body as IGame;
      const { userId } = req.user;

      const gameDto: IGame = { userId, date, hours, paymentType };
      const game = await gameService.upload(gameDto);

      return res.json(game);
    } catch (e) {
      next(e);
    }
  }
  async getGamesByUserId(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;

      const games = await gameService.getGamesByUserId(userId);

      return res.json(games);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const games = await gameService.getAllGames();

      return res.json(games);
    } catch (e) {
      next(e);
    }
  }
}

export default new GameController();
