import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    commentId: { type: ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

export default Like;
