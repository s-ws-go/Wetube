import routes from "../routes";

export const getJoin = (req, rep) => {
  rep.render("join", { pageTitle: "JOIN" });
};
export const postJoin = (req, rep) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    rep.status(400);
    rep.render("join", { pageTitle: "JOIN" });
  } else {
    //To Do : Register User
    //To Do : Log User in
    rep.redirect(routes.home);
  }
};

export const getLogin = (req, rep) =>
  rep.render("login", { pageTitle: "LOGIN" });
export const postLogin = (req, rep) => {
  rep.redirect(routes.home);
};

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
