import { Router } from 'express';
import gameController from '../controller/game-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';

const router = Router();

router.post('/', isAuth, gameController.upload);
router.get('/user', isAuth, gameController.getGamesByUserId);
router.post('/stat', isAuth, isAdmin, gameController.getGamesStat);
router.get('/:gameId', isAuth, gameController.getByGameId);
router.get('/', isAuth, isAdmin, gameController.getAll);
router.put('/pay/:gameId', isAuth, gameController.updatePayByGameId);
export default router;
