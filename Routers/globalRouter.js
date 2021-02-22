import express from "express";
import {
  getJoin, //Postjoin 입력시 에러나는 이유는??
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../Controllers/userController";
import { home, search } from "../Controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);
//user의 password가 맞나 틀리나 확인하는 middleware가 추가됨

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);
//video relation
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
//user relation
globalRouter.get(routes.logout, logout);

export default globalRouter;
