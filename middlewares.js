import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wantube";
  res.locals.routes = routes;
  //fake info 생성
  res.locals.loggedUser = req.user || null;
  next();
};

// 로그아웃 상태에서만 접근을 허용한다
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

//single : "videoFile" 이란 이름을 가진 input에는 한 파일만 업로드 할 수 있음을 의미
//input의 name 값이 single의 인자로 들어감
