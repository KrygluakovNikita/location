import { Equal } from 'typeorm';
import { Game } from '../database/entity/Game';
import { User } from '../database/entity/User';
import { IGame } from '../dtos/game-dto';
import UserError from '../exeptions/user-error';

class GameService {
  async upload(data: IGame): Promise<Game> {
    const user = await User.findOneBy({ user_id: data.user_id });

    if (!user) {
      throw UserError.UserNotFound();
    }

    const game = new Game();
    game.date = data.date;
    game.payment_type = data.payment_type;
    game.hours = data.hours;
    game.user = user;

    await game.save();

    return game;
  }

  async getGamesByUserId(userId: string): Promise<Game[]> {
    const games = await Game.find({ loadRelationIds: true, where: { user: Equal(userId) } });

    return games;
  }

  async getAllGames(): Promise<Game[]> {
    const games = await Game.find({ loadRelationIds: true });

    return games;
  }
}

export default new GameService();
