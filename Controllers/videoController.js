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
    const videos = await Video.find({}).sort({ _id: -1 });
    rep.render("home", { pageTitle: "HOME", videos });
  } catch (error) {
    console.log(error);
    rep.render("home", { pageTitle: "HOME", videos: [] });
  }
};

export const search = async (req, rep) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  rep.render("search", { pageTitle: "SEARCH", searchingBy, videos });
};
// export const videos = (req, rep) =>
//   rep.render("videos", { pageTitle: "VIDEOS" });
export const getUpload = (req, rep) => {
  rep.render("upload", { pageTitle: "UPLOAD" });
};
export const postUpload = async (req, rep) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  rep.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, rep) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    rep.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    rep.redirect(routes.home);
  }
};
export const getEditVideo = async (req, rep) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (`${video.creator}` !== `${req.user.id}`) {
      throw Error();
    } else {
      rep.render("editVideo", { pageTitle: `EDIT ${video.title}`, video });
    }
  } catch (error) {
    rep.redirect(routes.home);
  }
};

// rep.render("editVideo", { pageTitle: "EDIT VIDEO" });

export const postEditVideo = async (req, rep) => {
  console.log(req);
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    rep.redirect(routes.videoDetail(id));
  } catch (error) {
    rep.redirect(routes.home);
  }
};

export const deleteVideo = async (req, rep) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (`${video.creator}` !== `${req.user.id}`) {
      throw Error();
    } else {
      await Video.findByIdAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  rep.redirect(routes.home);
  // rep.render("deleteVideo", { pageTitle: "DELETE VIDEO" });
};

//Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
