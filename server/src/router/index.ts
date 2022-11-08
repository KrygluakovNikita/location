import { Router } from 'express';
import authRouter from './auth-router';
import gameRouter from './game-router';
import userRouter from './user-router';

const routes = Router();

routes.use('/auth', userRouter);
routes.use('/user', authRouter);
routes.use('/game', gameRouter);

export default routes;
