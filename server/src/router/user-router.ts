import { Router } from 'express';
import userController from '../controller/user-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';

const router = Router();

router.get('/', isAuth, isAdmin, userController.getUsers);
router.post('/reset/', userController.resetPassword);
router.post('/reset/verification', userController.verificationResetPin);
router.post('/reset/update-password', userController.updatePassword);

export default router;
