import express from "express";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, (req, rep) => rep.send("This is home!"));
globalRouter.get(routes.join, (req, rep) => rep.send("This is join!"));
globalRouter.get(routes.login, (req, rep) => rep.send("This is login!"));
globalRouter.get(routes.logout, (req, rep) => rep.send("This is logout!"));
globalRouter.get(routes.search, (req, rep) => rep.send("This is search!"));

export default globalRouter;
