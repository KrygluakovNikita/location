const Router = require('express').Router;
import userController from '../controller/user-controller';
import { body } from 'express-validator';
import { authMiddleware } from '../midlewares/auth-middleware';

const router = new Router();
router.post('/registration', body('email').isEmail(), body('password').isString().isLength({ min: 3, max: 64 }), userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

export default router;
