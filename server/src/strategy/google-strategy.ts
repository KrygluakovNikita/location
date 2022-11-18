import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { IGoogleDto } from '../interfaces/user-interface';
import userService from '../service/user-service';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/oauth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const googleDto: IGoogleDto = profile._json;

        const result = await userService.findOrCreateForGoogle(googleDto);

        done(null, result);
      } catch (err) {
        done(null, false, err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
