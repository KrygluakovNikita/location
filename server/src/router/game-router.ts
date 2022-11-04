const Router = require('express').Router;
import gameController from '../controller/game-controller';
const router = new Router();

router.post('/', gameController.upload);
router.get('/:userId', gameController.getGamesByUserId);
router.get('/', gameController.getAll);

export default router;
