import { Router } from 'express';
import userController from '../controller/user-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';
import { multerUploadPhoto } from '../middlewares/photo-middleware';

const router = Router();

router.get('/', isAuth, isAdmin, userController.getUsers);

router.post('/logout', isAuth, userController.logout);
router.get('/refresh', userController.refresh);

router.post('/update-photo', multerUploadPhoto, isAuth, userController.updatePhoto);
router.post('/delete-photo', isAuth, userController.deletePhoto);

router.post('/reset-password/', userController.resetPassword);
router.post('/reset-password/verification', userController.verificationResetPin);
router.post('/reset-password/update-password', userController.updateResetedPassword);

router.post('/change-password/', isAuth, userController.changePassword);
router.post('/change-password/verification', isAuth, userController.verificationChangePasswordPin);
router.post('/change-password/update-password', isAuth, userController.updateChangedPassword);

router.post('/change-email/', isAuth, userController.changeEmail);
router.post('/change-email/update-email', isAuth, userController.updateEmail);
router.post('/change-email/verification', isAuth, userController.verificationChangeEmailPin);

export default router;
