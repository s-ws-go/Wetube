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
    _json: {
      id,
      properties: { nickname: name, profile_image: avatarUrl },
      kakao_account: { email },
    },
  } = profile;
  // const {
  //   _json: {
  //     properties: { nickname, profile_image: avatarUrl },
  //   },
  // } = profile;
  // const {
  //   _json: {
  //     kakao_account: { email },
  //   },
  // } = profile;
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
      name,
      kakaoId: id,
      avatarUrl,
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
//get Edit profile은 로그인한 메일과 패스워드를 가지고 있어야 함
export const getEditProfile = (req, rep) =>
  rep.render("editProfile", { pageTitle: "EDIT PROFILE" });

export const postEditProfile = async (req, rep) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
      //req 안에는 user 객체가 있음. 만약에 file이 없다면 user의 기존 이미지(avatarUrl) 그대로 사용
    });
    rep.redirect(routes.me);
  } catch (error) {
    rep.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, rep) =>
  rep.render("changePassword", { pageTitle: "CHANGE PASSWORD" });

export const postChangePassword = async (req, rep) => {
  const { body: oldPassword, newPassword, newPassword1 } = req;
  try {
    if (newPassword !== newPassword1) {
      rep.status(400);
      rep.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    rep.redirect(routes.me);
  } catch (error) {
    rep.status(400);
    rep.redirect(`/users${routes.changePassword}`);
  }
};
