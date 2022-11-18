import { Router } from 'express';
import passport from 'passport';
require('../strategy/google-strategy');

const router = Router();

const CLIENT_URL = process.env.CLIENT_URL;
const LOGIN_FAILED = '/login/failed';

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      next(err);
    }
  });
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

router.get(LOGIN_FAILED, (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: LOGIN_FAILED,
  })
);

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

export default router;
