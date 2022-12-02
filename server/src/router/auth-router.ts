import { Router } from 'express';
import userController from '../controller/user-controller';
import { body } from 'express-validator';
import { multerUploadPhoto } from '../middlewares/photo-middleware';
import { isRegistrationToken } from '../middlewares/token-middleware';

const router = Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isString().isLength({ min: 3, max: 64 }),
  multerUploadPhoto,
  userController.registration
);

router.post('/registration/google', isRegistrationToken, userController.registrationForGoogle);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);
router.get('/activate/:link', userController.activate);

export default router;
