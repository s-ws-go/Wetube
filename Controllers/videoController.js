import routes from "../routes";
import Video from "../models/Video";

// export const home = async (req, rep) => {
//   const videos = await Video.find({});
//   rep.render("home", { pageTitle: "HOME", videos });
// };
// Video에서 모델 찾아오는 작업을 비동기처리하는 건데, 이 경우 await 다음 작업이 에러가 발생해도 async로 지정해준 rendering 발생하게 됨.
// -> try - catch 사용

export const home = async (req, rep) => {
  try {
    const videos = await Video.find({});
    rep.render("home", { pageTitle: "HOME", videos });
  } catch (error) {
    console.log(error);
    rep.render("home", { pageTitle: "HOME", videos: [] });
  }
};

export const search = (req, rep) => {
  const {
    query: { term: searchingBy },
  } = req;
  rep.render("search", { pageTitle: "SEARCH", searchingBy, videos });
};
// export const videos = (req, rep) =>
//   rep.render("videos", { pageTitle: "VIDEOS" });
export const getUpload = (req, rep) => {
  rep.render("upload", { pageTitle: "UPLOAD" });
};
export const postUpload = (req, rep) => {
  const {
    body: { file, title, description },
  } = req;
  //To do : Upload and Save video
  console.log(file, title, description);
  rep.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, rep) =>
  rep.render("videoDetail", { pageTitle: "DETAIL VIDEO" });
export const editVideo = (req, rep) =>
  rep.render("editVideo", { pageTitle: "EDIT VIDEO" });
export const deleteVideo = (req, rep) =>
  rep.render("deleteVideo", { pageTitle: "DELETE VIDEO" });
