import { IGame } from './../interfaces/game-interface';
import { IUserRequest } from './../interfaces/user-interface';
import { Request, Response, NextFunction } from 'express';
import gameService from '../service/game-service';

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

  async getGamesStat(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.body;

      const games = await gameService.getGamesStat(startDate, endDate);

      return res.json(games);
    } catch (e) {
      next(e);
    }
  }

  async getByGameId(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const gameId = req.params.gameId;
      const { userId } = req.user;

      const game = await gameService.getByGameId(userId, gameId);

      return res.json(game);
    } catch (e) {
      next(e);
    }
  }

  async updatePayByGameId(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const gameId = req.params.gameId;
      const { isPayed } = req.body;
      const { userId } = req.user;

      const game = await gameService.updatePayByGameId(userId, gameId, isPayed);

      return res.json(game);
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
