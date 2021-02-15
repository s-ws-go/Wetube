import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  //fake info 생성
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};
