import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
//mongoose의 공통 명령어 적용.

const db = mongoose.connection;

const handleOpen = () => console.log("💚Connected to DB");

const handleError = (error) =>
  console.log(`❌Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
// db open은 한번하고 싶으니 once, 에러는 발생할 때 마다 알고 싶으니 on
