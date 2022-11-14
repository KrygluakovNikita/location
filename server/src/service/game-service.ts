import { IGame } from './../interfaces/game-interface';
import { Equal } from 'typeorm';
import { Game, User } from '../database/entity';
import { GameDto } from '../dtos/game-dto';

class GameService {
  async upload(data: IGame): Promise<GameDto> {
    const game = new Game();

    const user = await User.findOneBy({ userId: data.userId });

    game.date = data.date;
    game.paymentType = data.paymentType;
    game.hours = data.hours;
    game.user = user;

    await game.save();
    const result = new GameDto(game);

    return result;
  }

  async getGamesByUserId(userId: string): Promise<GameDto[]> {
    const user = await User.findOneBy({ userId });

    const games = await Game.find({ where: { user: Equal(user.userId) }, relations: { user: true } });
    const result = games.map(game => new GameDto(game));

    return result;
  }

  async getAllGames(): Promise<GameDto[]> {
    const games = await Game.find({ relations: { user: true } });

    const result = games.map(game => new GameDto(game));

    return result;
  }
}

export default new GameService();
