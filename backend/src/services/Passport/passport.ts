import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import {
  ProviderStrategyOptionsProps,
  UserProps,
} from "../../interfaces/interface";
import dotenv from "dotenv";
import { Services } from "../../containers/ServicesContainer";
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: UserProps, done) => {
  done(null, obj);
});

function getProfileData(profile: Profile) {
  const emailToLowerCase = profile?.emails?.[0]?.value!.toLowerCase();
  const userName = profile.displayName;
  const userId = profile?.id;
  return { emailToLowerCase, userName, userId };
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/google/callback",
    } as ProviderStrategyOptionsProps,
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (err: unknown, user?: false | {}, info?: {} | undefined) => void
    ) => {
      try {
        const { emailToLowerCase, userName, userId } = getProfileData(profile);
        const { user, token } =
          await Services.generateProviderUserService.generate(
            userName,
            userId,
            false,
            emailToLowerCase
          );

        return done(null, { user, token });
      } catch (error: unknown) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/github/callback",
    } as ProviderStrategyOptionsProps,
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
        const { userName, userId } = getProfileData(profile);
        const { user, token } =
          await Services.generateProviderUserService.generate(
            userName,
            userId,
            true
          );

        return done(null, { user, token });
      } catch (error: unknown) {
        return done(error);
      }
    }
  )
);

export default passport;
