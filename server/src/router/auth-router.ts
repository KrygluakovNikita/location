import { Router } from 'express';
import userController from '../controller/user-controller';
import { body } from 'express-validator';

const router = Router();

router.post('/registration', body('email').isEmail(), body('password').isString().isLength({ min: 3, max: 64 }), userController.registration);
router.post('/login', userController.login);
router.get('/activate/:link', userController.activate);

export default router;
