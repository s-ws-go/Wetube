import { videos } from "../db";
import routes from "../routes";

export const home = (req, rep) =>
  rep.render("home", { pageTitle: "HOME", videos });
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
  rep.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, rep) =>
  rep.render("videoDetail", { pageTitle: "DETAIL VIDEO" });
export const editVideo = (req, rep) =>
  rep.render("editVideo", { pageTitle: "EDIT VIDEO" });
export const deleteVideo = (req, rep) =>
  rep.render("deleteVideo", { pageTitle: "DELETE VIDEO" });
