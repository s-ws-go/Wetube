import express from "express";

export const userRouter = express.Router();

//get 안에 홈 링크에서 적용할 함수 호출한거임.
userRouter.get("/", (req, res) => res.send("user index"));
userRouter.get("/edit", (req, res) => res.send("user edit"));
userRouter.get("/password", (req, res) => res.send("user password"));

//route들의 집합인 router를 export 해 줌

// export default userRouter;
