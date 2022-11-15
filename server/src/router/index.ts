import { Router } from 'express';
import authRouter from './auth-router';
import gameRouter from './game-router';
import userRouter from './user-router';
import postRouter from './post-router';
import commentRouter from './comment-router';
import replyRouter from './reply-router';
import likeRouter from './like-router';
import qrService from '../service/qr-service';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/game', gameRouter);
routes.use('/user', userRouter);
routes.use('/post', postRouter);
routes.use('/comment', commentRouter);
routes.use('/reply', replyRouter);
routes.use('/like', likeRouter);

routes.get('/qr', async (req, res, next) => {
  return res.send(
    await qrService.createQrCode(
      'https://www.google.com/search?q=%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0+%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C+%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B+%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%B0+%D0%B0+%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0+%D1%82%D0%B5%D0%BB%D0%BE+%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%B0&sxsrf=ALiCzsYMbkxxRpFqCVFGyxHxohorJJwF9Q%3A1668504162917&ei=YlpzY_TIN438rgTRkZ-QAg&ved=0ahUKEwj0gb-v7q_7AhUNvosKHdHIByIQ4dUDCA8&uact=5&oq=%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0+%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C+%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B+%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%B0+%D0%B0+%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0+%D1%82%D0%B5%D0%BB%D0%BE+%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%B0&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCCEQoAEyBQghEKABOgoIABBHENYEELADOgUIABCABDoGCAAQFhAeOggIIRAWEB4QHToHCCEQoAEQCkoECEEYAEoECEYYAFDFBVj4OWDQOmgEcAF4AIABfYgB6R2SAQUyOC4xMpgBAKABAcgBCMABAQ&sclient=gws-wiz-serp'
    )
  );
});

export default routes;
