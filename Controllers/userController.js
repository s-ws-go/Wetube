import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, rep) => {
  rep.render("join", { pageTitle: "JOIN" });
};
export const postJoin = async (req, rep, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    rep.status(400);
    rep.render("join", { pageTitle: "JOIN" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
      //To Do : Log User in
    } catch (error) {
      console.log(error);
      rep.redirect(routes.home);
    }
  }
};

export const getLogin = (req, rep) =>
  rep.render("login", { pageTitle: "LOGIN" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(profile);
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
// 로그인이 끝난 이후 과정
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(profile);
  const {
    _json: { id },
  } = profile;
  const {
    _json: {
      properties: { nickname, profile_image: avartarUrl },
    },
  } = profile;
  const {
    _json: {
      kakao_account: { email },
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      nickname,
      kakaoId: id,
      avartarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, rep) => {
  req.logout();
  rep.redirect(routes.home);
};

// export const users = (req, rep) => {
//   return rep.render("users");
// };

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "DETAIL USER", user: req.user });
};

export const userDetail = async (req, rep) => {
  const {
    params: { id },
  } = req;
  try {
    //id로 사용자를 찾아  userdetail을 rendering 해 줌.
    const user = await User.findById(id);
    rep.render("userDetail", { pageTitle: "DETAIL USER", user });
  } catch (error) {
    rep.redirect(routes.home);
  }
};
export const editProfile = (req, rep) =>
  rep.render("editProfile", { pageTitle: "EDIT PROFILE" });
export const changePassword = (req, rep) =>
  rep.render("changePassword", { pageTitle: "CHANGE PASSWORD" });
