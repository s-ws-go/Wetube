export const join = (req, rep) => rep.render("join");
export const login = (req, rep) => rep.render("login");
export const logout = (req, rep) => rep.render("logout");
export const users = (req, rep) => {
  return rep.render("users");
};
export const userDetail = (req, rep) => rep.render("userDetail");
export const editProfile = (req, rep) => rep.render("editProfile");
export const changePassword = (req, rep) => rep.render("changePassword");
