import { Router } from 'express';
import equipmentController from '../controller/equipment-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';
import { multerUploadPhoto } from '../middlewares/photo-middleware';

const router = Router();

router.post('/', isAuth, isAdmin, equipmentController.upload);
router.post('/upload-photo/:equipmentId', isAuth, isAdmin, multerUploadPhoto, equipmentController.updatePhoto);
router.post('/by-date', equipmentController.getAllEquipmentByDate);
router.get('/', equipmentController.getAllEquipment);
router.get('/:equipmentId', equipmentController.getById);
router.delete('/:equipmentId', isAuth, isAdmin, equipmentController.deleteById);
router.put('/:equipmentId', isAuth, isAdmin, equipmentController.updateById);

export default router;
