import { Router } from 'express';
import userController from '../controller/user-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';

const router = Router();

router.get('/users', isAuth, isAdmin, userController.getUsers);

export default router;
