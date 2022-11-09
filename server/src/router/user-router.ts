import { Router } from 'express';
import userController from '../controller/user-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';

const router = Router();

router.get('/', isAuth, isAdmin, userController.getUsers);
router.post('/reset', userController.resetPassword);
router.get('/reset/:token', userController.resetToken);

export default router;
