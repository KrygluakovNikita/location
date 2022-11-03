const Router = require('express').Router;
import userController from '../controller/user-controller';
import { body } from 'express-validator';
const router = new Router();

router.post('/registration', body('email').isEmail(), body('password').isString().isLength({ min: 3, max: 64 }), userController.registration);
router.post('/login', userController.login);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

export default router;
