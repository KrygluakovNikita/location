import { Router } from 'express';
import commentController from '../controller/comment-controller';
import { isAuth } from '../middlewares/auth-middleware';

const router = Router();

router.post('/:postId', isAuth, commentController.upload);
router.get('/:postId', commentController.getByPostId);
router.patch('/:commentId', isAuth, commentController.update);
router.delete('/:commentId', isAuth, commentController.delete);

export default router;
