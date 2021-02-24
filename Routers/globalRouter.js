import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../Controllers/videoController";
import {
  getJoin, //Postjoin 입력시 에러나는 이유는??
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
} from "../Controllers/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
//user의 password가 맞나 틀리나 확인하는 middleware가 추가됨

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
//video relation
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
//user relation
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

export default globalRouter;
