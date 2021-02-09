import express from "express";
import { join, login, logout } from "../Controllers/userController";
import { home, search } from "../Controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();
//video relation
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
//user relation
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;
