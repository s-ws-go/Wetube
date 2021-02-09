export const join = (req, rep) => rep.send("This is join!");
export const login = (req, rep) => rep.send("This is login!");
export const logout = (req, rep) => rep.send("This is logout!");
export const users = (req, rep) => {
  return rep.send("This is users!");
};
export const userDetail = (req, rep) => rep.send("This is userDetail!");
export const editProfile = (req, rep) => rep.send("This is editProfile!");
export const changePassword = (req, rep) => rep.send("This is changePassword!");
