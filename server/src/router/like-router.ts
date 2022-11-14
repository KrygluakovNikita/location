import { Router } from 'express';
import likeController from '../controller/like-controller';
import { isAuth } from '../middlewares/auth-middleware';

const router = Router();

router.post('/:postId', isAuth, likeController.upload);
router.get('/:postId', likeController.getByPostId);
router.get('/', isAuth, likeController.getByUserId);
router.delete('/:postId', isAuth, likeController.deleteByPostId);

export default router;
