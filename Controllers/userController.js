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

export const logout = (req, rep) => {
  //To do : Process Log Out
  rep.redirect(routes.home);
};

export const users = (req, rep) => {
  return rep.render("users");
};
export const userDetail = (req, rep) =>
  rep.render("userDetail", { pageTitle: "DETAIL USER" });
export const editProfile = (req, rep) =>
  rep.render("editProfile", { pageTitle: "EDIT PROFILE" });
export const changePassword = (req, rep) =>
  rep.render("changePassword", { pageTitle: "CHANGE PASSWORD" });
