import { IUserRequest } from '../interfaces/user-interface';
import { Request, Response, NextFunction } from 'express';
import equipmentService from '../service/equipment-service';

export interface IEquipment {
  title: string;
  description: string;
  count?: number;
}

class EquipmentController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, count = 1 } = req.body;

      const equipmentDto: IEquipment = { title, description, count };
      const equipment = await equipmentService.upload(equipmentDto);

      return res.json(equipment);
    } catch (e) {
      next(e);
    }
  }
  async getAllEquipmentByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const { date } = req.body;

      const likes = await equipmentService.getAllEquipmentByDate(date);

      return res.json(likes);
    } catch (e) {
      next(e);
    }
  }
  async getAllEquipment(req: Request, res: Response, next: NextFunction) {
    try {
      const likes = await equipmentService.getAllEquipment();

      return res.json(likes);
    } catch (e) {
      next(e);
    }
  }
  async deleteById(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const equipmentId = req.params.equipmentId;

      await equipmentService.deleteById(equipmentId);

      return res.end();
    } catch (e) {
      next(e);
    }
  }
}

export default new EquipmentController();
