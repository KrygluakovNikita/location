import { Router } from 'express';
import passport from 'passport';
import { IServerData } from '../service/user-service';
require('../strategy/google-strategy');

const router = Router();

const CLIENT_URL = process.env.CLIENT_URL;

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      next(err);
    }
  });
  res.clearCookie('refreshToken');
  res.redirect(CLIENT_URL);
});

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfully',
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get('/google/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.get('/google/callback', (req, res) => {
  passport.authenticate(
    'google',
    {
      successRedirect: CLIENT_URL,
      failureRedirect: 'failed',
    },
    async (err, data: IServerData) => {
      if (err) {
        res.redirect('failed');
      }
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(data.userData).redirect(CLIENT_URL);
    }
  )(req, res);
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

export default router;
