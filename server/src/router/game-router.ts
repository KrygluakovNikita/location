const Router = require('express').Router;
import gameController from '../controller/game-controller';
import { isAdmin, isAuth } from '../middlewares/auth-middleware';

const router = new Router();

router.post('/', isAuth, gameController.upload);
router.get('/user', isAuth, gameController.getGamesByUserId);
router.get('/', isAuth, isAdmin, gameController.getAll);

export default router;
