import { Router } from 'express';
import replyController from '../controller/reply-controller';
import { isAuth } from '../middlewares/auth-middleware';

const router = Router();

router.post('/:commentId', isAuth, replyController.upload);
router.get('/:commentId', replyController.getByCommentId);
router.patch('/:commentId', isAuth, replyController.update);
router.delete('/:commentId', isAuth, replyController.delete);

export default router;
