import { IUserRequest } from '../interfaces/user-interface';
import { Request, Response, NextFunction } from 'express';
import equipmentService from '../service/equipment-service';

export interface IEquipment {
  title: string;
  description: string;
  count?: number;
  price: number;
}

class EquipmentController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, count = 1, price } = req.body;

      const equipmentDto: IEquipment = { title, description, count, price };
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
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const equipmentId = req.params.equipmentId as string;

      const equipment = await equipmentService.getById(equipmentId);
      return res.json(equipment);
    } catch (e) {
      next(e);
    }
  }
  async deleteById(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const equipmentId = req.params.equipmentId;
      const deleted = await equipmentService.deleteById(equipmentId);

      return res.json(deleted);
    } catch (e) {
      next(e);
    }
  }
  async updateById(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const equipmentId = req.params.equipmentId;
      const { title, description, count, price } = req.body;
      const equipmentDto: IEquipment = { title, description, count, price };
      const deleted = await equipmentService.updateById(equipmentId, equipmentDto);

      return res.json(deleted);
    } catch (e) {
      next(e);
    }
  }
}

export default new EquipmentController();
