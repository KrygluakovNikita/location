import { Router } from 'express';
import passport from 'passport';
import { IRTRequest } from '../interfaces/user-interface';
import { clearCookie } from '../middlewares/token-middleware';
require('../strategy/google-strategy');

const router = Router();

const CLIENT_URL = process.env.CLIENT_URL;
const CLIENT_REGISTRATION_GOOGLE_URL = process.env.CLIENT_REGISTRATION_GOOGLE_URL;
const CLIENT_LOGIN_GOOGLE_URL = process.env.CLIENT_LOGIN_GOOGLE_URL;

router.get('/logout', clearCookie, (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      next(err);
    }
  });
  res.redirect(CLIENT_URL);
});

router.get('/google/success', clearCookie, (req: IRTRequest, res, next) => {
  if (req.user.userData) {
    res.cookie('refreshToken', req.user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.cookie('serverUserData', JSON.stringify(req.user.userData), {
      maxAge: 5 * 60 * 1000,
      secure: false,
    });

    res.redirect(CLIENT_URL);
  } else if (req.user.registrationToken) {
    res.cookie('registrationToken', req.user.registrationToken, {
      maxAge: 6 * 60 * 60 * 1000,
    });

    res.redirect(CLIENT_REGISTRATION_GOOGLE_URL);
  }
});

router.get('/google/failed', (req, res) => {
  res.redirect(CLIENT_LOGIN_GOOGLE_URL);
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'success',
    failureRedirect: 'failed',
  })
);

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

export default router;
