export const join = (req, rep) => rep.render("join", { pageTitle: "JOIN" });
export const login = (req, rep) => rep.render("login", { pageTitle: "LOGIN" });
export const logout = (req, rep) =>
  rep.render("logout", { pageTitle: "LOGOUT" });
export const users = (req, rep) => {
  return rep.render("users");
};
export const userDetail = (req, rep) =>
  rep.render("userDetail", { pageTitle: "DETAIL USER" });
export const editProfile = (req, rep) =>
  rep.render("editProfile", { pageTitle: "EDIT PROFILE" });
export const changePassword = (req, rep) =>
  rep.render("changePassword", { pageTitle: "CHANGE PASSWORD" });
