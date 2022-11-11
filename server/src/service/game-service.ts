import { IGame } from './../interfaces/game-interface';
import { Equal } from 'typeorm';
import { Game, User } from '../database/entity';

class GameService {
  async upload(data: IGame): Promise<Game> {
    const game = new Game();

    const user = await User.findOneBy({ userId: data.userId });

    game.date = data.date;
    game.paymentType = data.paymentType;
    game.hours = data.hours;
    game.user = user;

    await game.save();

    return game;
  }

  async getGamesByUserId(userId: string): Promise<Game[]> {
    const user = await User.findOneBy({ userId });

    const games = await Game.findBy({ user: Equal(user.userId) });

    return games;
  }

  async getAllGames(): Promise<Game[]> {
    const games = await Game.find({ loadRelationIds: true });

    return games;
  }
}

export default new GameService();
