import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const dislikeSchema = new Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    commentId: { type: ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

const Dislike = mongoose.model("Dislike", dislikeSchema);

export default Dislike;
