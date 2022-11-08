import { Router } from 'express';
import authRouter from './auth-router';
import gameRouter from './game-router';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/game', gameRouter);

export default routes;
