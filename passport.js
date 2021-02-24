import passport from "passport";
import GitHubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./Controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());
// 쿠키에는 오직 user의 id만 담아서 전송해. 라는 명령

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
