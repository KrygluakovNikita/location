import { Router } from 'express';
import postController from '../controller/post-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';
import { multerUploadPhoto } from '../middlewares/photo-middleware';

const router = Router();

router.post('/', isAuth, isAdmin, multerUploadPhoto, postController.upload);
router.patch('/', isAuth, isAdmin, postController.update);
router.delete('/:postId', isAuth, isAdmin, postController.delete);
router.get('/:postId', postController.getOne);
router.get('/', postController.getAll);
router.get('/:search', postController.search);

export default router;
