import { EquipmentDto } from '../dtos/equipment-dto';
import ApiError from '../exeptions/api-error';
import { IEquipment } from '../controller/equipment-controller';
import { Equipment } from '../database/entity/Equipment';

class EquipmentService {
  async upload(data: IEquipment): Promise<EquipmentDto> {
    const available = await Equipment.findOne({ where: { title: data.title, description: data.description } });
    if (available && !available.disabled) {
      return;
    }
    if (typeof data.count !== 'undefined' && data.count < 1) {
      throw ApiError.BadRequest('Вы не можете указать количество меньше 1');
    }

    if (available && available.disabled) {
      available.disabled = false;
      available.count = data.count ?? 1;
      available.price = data.price;
      await available.save();

      const equipmentDto = new EquipmentDto(available);

      return equipmentDto;
    }

    const equipment = new Equipment();
    equipment.title = data.title;
    equipment.description = data.description;
    equipment.count = data.count ?? 1;
    equipment.price = data.price;

    await equipment.save();

    const equipmentDto = new EquipmentDto(equipment);

    return equipmentDto;
  }

  async getAllEquipmentByDate(date: Date): Promise<EquipmentDto[]> {
    const equipments = await Equipment.createQueryBuilder('equipment')
      .leftJoinAndSelect('equipment.games', 'game')
      .where('game.date > :startDate', { startDate: date })
      .andWhere('game.date < :endDate', { endDate: date })
      .andWhere('equipment.disabled = false')
      .getMany();
    const doesNotUsingEquipments = await Equipment.find({ where: { games: [], disabled: false } });

    const validEquipments = [...equipments, ...doesNotUsingEquipments]?.map(equipment => new EquipmentDto(equipment));

    return validEquipments;
  }

  async getAllEquipment(): Promise<EquipmentDto[]> {
    const equipments = await Equipment.find({ where: { disabled: false } });

    const equipmentsDto = equipments.map(equipment => new EquipmentDto(equipment));
    return equipmentsDto;
  }

  async deleteById(equipmentId: string): Promise<EquipmentDto> {
    const equipment = await Equipment.findOneBy({ equipmentId });
    if (!equipment) {
      throw ApiError.BadRequest('Такого оборудования не существует');
    }

    equipment.disabled = true;
    await equipment.save();
    return equipment;
  }

  async getById(equipmentId: string): Promise<EquipmentDto> {
    const equipment = await Equipment.findOneBy({ equipmentId });
    if (!equipment) {
      throw ApiError.BadRequest('Такого оборудования не существует');
    }

    return equipment;
  }

  async updateById(equipmentId: string, data: IEquipment): Promise<EquipmentDto> {
    const available = await Equipment.findOne({ where: { equipmentId } });
    if (!available && !available.disabled) {
      throw ApiError.BadRequest('Вы не можете обновить данные удалённого оборудования');
    }

    if (typeof data.count !== 'undefined' && data.count < 1) {
      throw ApiError.BadRequest('Вы не можете указать количество меньше 1');
    }
    if (typeof data.description !== 'undefined' && data.description !== null) available.description = data.description;
    if (typeof data.title !== 'undefined' && data.title !== null) available.title = data.title;
    if (typeof data.count !== 'undefined' && data.count !== null) available.count = data.count ?? 1;
    if (typeof data.price !== 'undefined' && data.price !== null) available.price = data.price;
    await available.save();

    const equipmentDto = new EquipmentDto(available);

    return equipmentDto;
  }
}

export default new EquipmentService();
