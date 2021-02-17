import mongoose, { Mongoose } from "mongoose";

//비디오를 db에 넣는게 아니라 링크 따오는 거임.
const VideoSchema = new mongoose.Schema({
  fileurl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

//schema를 이용해서 model 만들기

const model = mongoose.model("Video", VideoSchema);
export default model;
