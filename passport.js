import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());
// 쿠키에는 오직 user의 id만 담아서 전송해. 라는 명령
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
