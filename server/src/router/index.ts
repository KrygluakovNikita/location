import { Router } from 'express';
import authRouter from './auth-router';
import gameRouter from './game-router';
import userRouter from './user-router';
import postRouter from './post-router';
import commentRouter from './comment-router';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/game', gameRouter);
routes.use('/user', userRouter);
routes.use('/post', postRouter);
routes.use('/comment', commentRouter);

export default routes;
