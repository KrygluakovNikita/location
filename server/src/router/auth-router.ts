const Router = require('express').Router;
import userController from '../controller/user-controller';
import { body } from 'express-validator';
const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isString().isLength({ min: 3, max: 64 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

export default router;
