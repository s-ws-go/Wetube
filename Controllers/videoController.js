export const home = (req, rep) => rep.render("home", { pageTitle: "HOME" });
export const search = (req, rep) =>
  rep.render("search", { pageTitle: "SEARCH" });
export const videos = (req, rep) =>
  rep.render("videos", { pageTitle: "VIDEOS" });
export const upload = (req, rep) =>
  rep.render("upload", { pageTitle: "UPLOAD" });
export const videoDetail = (req, rep) =>
  rep.render("videoDetail", { pageTitle: "DETAIL VIDEO" });
export const editVideo = (req, rep) =>
  rep.render("editVideo", { pageTitle: "EDIT VIDEO" });
export const deleteVideo = (req, rep) =>
  rep.render("deleteVideo", { pageTitle: "DELETE VIDEO" });
