import { Equipment } from '../database/entity/Equipment';

export class EquipmentDto {
  equipmentId: string;
  title: string;
  description: string;
  descriptionAboutStaff: string;
  photo: string;
  count: number;
  price: number;
  constructor(model: Equipment) {
    this.equipmentId = model.equipmentId;
    this.title = model.title;
    this.description = model.description;
    this.count = model.count;
    this.price = model.price;
    this.descriptionAboutStaff = model.descriptionAboutStaff;
    this.photo = model.photo;
  }
}
