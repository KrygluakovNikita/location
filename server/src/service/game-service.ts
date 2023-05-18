import { IGame, IStatChart, StatChartEnum } from './../interfaces/game-interface';
import { Equal,  MoreThanOrEqual, Between } from 'typeorm';
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
    const dateOnThisTime = await Game.find({
      where: {
        date: Between(data.date, moment(data.date).add(data.hours, 'hours').toDate()),
        equipment: Equal(equipment.equipmentId),
      },
    });

    if (equipment.count <= dateOnThisTime.length) {
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

  async getGamesStat(startDate: Date, endDate: Date): Promise<any> {
    const games = await Game.findAndCount({ where: { date: Between(startDate, endDate) }, relations: { user: true, equipment: true } });

    return { games: games[0], count: games[1] };
  }

  async getGamesStatChart({ type, startDate, equipment }: IStatChart): Promise<any> {
    const abuse: any = { date: MoreThanOrEqual(startDate) };
    let endDate: Date;

    if (type == StatChartEnum.MONTH) {
      endDate = moment(startDate).add(1, 'months').toDate();
    } else {
      endDate = moment(startDate).add(1, 'years').toDate();
    }
    if (equipment) {
      abuse.equipment = equipment;
    }

    const games = await Game.findAndCount({ where: { date: Between(startDate, endDate) }, relations: { user: true, equipment: true } });

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

  async updatePayByGameId(gameId: string, isPayed: boolean): Promise<GameDto> {
    const game = await Game.findOne({ where: { gameId: Equal(gameId) }, relations: { user: true } });

    game.isPayed = isPayed;
    await game.save();

    const result = new GameDto(game);

    return result;
  }

  async getAllGames(): Promise<GameDto[]> {
    const games = await Game.find({
      relations: { user: true, equipment: true },
      order: {
        createdAt: 'ASC',
      },
    });

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
