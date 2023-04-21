import { Router } from 'express';
import equipmentController from '../controller/equipment-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';

const router = Router();

router.post('/', isAuth, isAdmin, equipmentController.upload);
router.post('/by-date', equipmentController.getAllEquipmentByDate);
router.get('/', isAuth, isAdmin, equipmentController.getAllEquipment);
router.delete('/:equipmentId', isAuth, isAdmin, equipmentController.deleteById);

export default router;
