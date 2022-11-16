import { Router } from 'express';
import userController from '../controller/user-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';

const router = Router();

router.get('/', isAuth, isAdmin, userController.getUsers);

router.post('/reset-password/', userController.resetPassword);
router.post('/reset-password/verification', userController.verificationResetPin);
router.post('/reset-password/update-password', userController.updateResetedPassword);

router.post('/change-password/', userController.changePassword);
router.post('/change-password/verification', userController.verificationChangePasswordPin);
router.post('/change-password/update-password', userController.updateChangedPassword);

// router.post('/change-email/', userController.resetPassword);
// router.post('/change-email/verification', userController.verificationResetPin);
// router.post('/change-email/update-email', userController.updatePassword);

export default router;
