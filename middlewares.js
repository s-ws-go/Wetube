import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "Videos/" });

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

export const uploadVideo = multerVideo.single("videoFile");

//single : "videoFile" 이란 이름을 가진 input에는 한 파일만 업로드 할 수 있음을 의미
