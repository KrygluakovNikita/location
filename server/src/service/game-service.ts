import { IGame } from './../interfaces/game-interface';
import { Equal, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Game, User, UserRole } from '../database/entity';
import { GameDto, GameDtoWithQr } from '../dtos/game-dto';
import UserError from '../exeptions/user-error';
import qr from 'qrcode';
import ApiError from '../exeptions/api-error';
import { Equipment } from '../database/entity/Equipment';
import moment from 'moment';
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
    const equipment = await Equipment.findOne({ where: { equipmentId: data.equipmentId, disabled: false } });
    if (!equipment) {
      throw ApiError.BadRequest('Оборудование не найдено');
    }
    const abuse = { date: LessThanOrEqual(data.date) };
    const dateOnThisTime = await Game.find({ where: { date: MoreThanOrEqual(moment(data.date).add(data.hours, 'hours').toDate()), ...abuse } });

    if (equipment.count >= dateOnThisTime.length) {
      throw ApiError.BadRequest('Данное оборудование уже занято на это время');
    }
    game.date = data.date;
    game.paymentType = data.paymentType;
    game.hours = data.hours;
    game.user = user;
    game.createdAt = new Date();
    game.equipment = equipment;

    await game.save();
    const result = new GameDto(game);

    return result;
  }

  async getGamesByUserId(userId: string): Promise<GameDto[]> {
    const user = await User.findOneBy({ userId });

    const games = await Game.find({ where: { user: Equal(user.userId) }, relations: { user: true, equipment: true } });
    const result = games.map(game => new GameDto(game));

    return result;
  }

  async getGamesStat(startDate, endDate): Promise<any> {
    const abuse = { date: LessThanOrEqual(startDate) };
    const games = await Game.findAndCount({ where: { date: MoreThanOrEqual(endDate), ...abuse }, relations: { user: true, equipment: true } });

    return { games: games[0], count: games[1] };
  }

  async getByGameId(userId: string, gameId: string): Promise<GameDtoWithQr> {
    const user = await User.findOneBy({ userId });

    if (!user) {
      throw UserError.UserNotFound();
    }

    const game = await Game.findOne({ where: { gameId: Equal(gameId) }, relations: { user: true, equipment: true } });
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
    const games = await Game.find({ relations: { user: true, equipment: true } });

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
