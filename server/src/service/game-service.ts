import { IGame } from './../interfaces/game-interface';
import { Equal, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Game, User, UserRole } from '../database/entity';
import { GameDto, GameDtoWithQr } from '../dtos/game-dto';
import UserError from '../exeptions/user-error';
import qr from 'qrcode';
import ApiError from '../exeptions/api-error';

class GameService {
  async upload(data: IGame): Promise<GameDto> {
    const game = new Game();

    const user = await User.findOneBy({ userId: data.userId });

    if (!user) {
      throw UserError.UserNotFound();
    }

    if (!user.isActivated) {
      throw UserError.EmailIsNotActivated();
    }

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

  async getByGameId(userId: string, gameId: string): Promise<GameDtoWithQr> {
    const user = await User.findOneBy({ userId });

    if (!user) {
      throw UserError.UserNotFound();
    }

    const game = await Game.findOne({ where: { gameId: Equal(gameId) }, relations: { user: true } });
    if (game.user.userId !== userId && user.role !== UserRole.ADMIN) {
      throw UserError.NotAllow();
    }

    const qrCode = await this.generateQrCode(game.gameId);

    const result = new GameDtoWithQr(game, qrCode);

    return result;
  }

  async updatePayByGameId(userId: string, gameId: string, isPayed: boolean): Promise<GameDto> {
    const user = await User.findOneBy({ userId });

    if (!user) {
      throw UserError.UserNotFound();
    }

    const game = await Game.findOne({ where: { gameId: Equal(gameId) }, relations: { user: true } });
    if (game.user.userId !== userId || user.role !== UserRole.ADMIN) {
      throw UserError.NotAllow();
    }
    if (game.isPayed !== isPayed) {
      game.isPayed = isPayed;
      await game.save();
    }

    const result = new GameDto(game);

    return result;
  }

  async getAllGames(): Promise<GameDto[]> {
    const games = await Game.find({ relations: { user: true } });

    const result = games.map(game => new GameDto(game));

    return result;
  }

  async generateQrCode(gameId: string) {
    const link = `${process.env.CLIENT_URL_GAME}/${gameId}`;
    const qrCode = await qr.toDataURL(link);

    return qrCode;
  }
}

export default new GameService();
