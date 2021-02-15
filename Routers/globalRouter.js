import express from "express";
import {
  getJoin,
  login,
  logout,
  postJoin,
} from "../Controllers/userController";
import { home, search } from "../Controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

//video relation
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
//user relation
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;
