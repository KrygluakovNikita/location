import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { IGoogleDto } from '../interfaces/user-interface';
import userService, { IServerData } from '../service/user-service';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/oauth/google/callback',
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: { _json: IGoogleDto },
      done: (arg0: any, arg1: boolean | IServerData | { registrationToken: string }, arg2: undefined) => void
    ) {
      try {
        const googleDto: IGoogleDto = profile._json;

        const result = await userService.findOrCreateForGoogle(googleDto);

        done(null, result, null);
      } catch (err) {
        done(null, null, err);
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
