import { Request, Response, NextFunction } from 'express';
import gameService from '../service/game-service';

import { IGame } from '../dtos/game-dto';

class GameContoller {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id, date, hours, payment_type } = req.body as IGame;
      const gameDto: IGame = { user_id, date, hours, payment_type };
      const game = await gameService.upload(gameDto);

      return res.json(game);
    } catch (e) {
      next(e);
    }
  }
  async getGamesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

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

export default new GameContoller();
