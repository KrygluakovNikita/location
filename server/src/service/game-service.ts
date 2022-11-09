import { Equal } from 'typeorm';
import { Game } from '../database/entity/Game';
import { User } from '../database/entity/User';
import { IGame } from '../dtos/game-dto';

class GameService {
  async upload(data: IGame): Promise<Game> {
    const game = new Game();
    game.date = data.date;
    game.paymentType = data.paymentType;
    game.hours = data.hours;
    game.userId = data.userId;

    await game.save();

    return game;
  }

  async getGamesByUserId(userId: string): Promise<Game[]> {
    const games = await Game.find({ loadRelationIds: true, where: { userId: Equal(userId) } });

    return games;
  }

  async getAllGames(): Promise<Game[]> {
    const games = await Game.find({ loadRelationIds: true });

    return games;
  }
}

export default new GameService();
