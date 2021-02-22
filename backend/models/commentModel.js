import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    writer: {
      type: ObjectId,
      ref: "User",
    },
    postId: {
      type: ObjectId,
      ref: "Product",
    },
    responseTo: {
      type: ObjectId,
      ref: "User",
    },
    content: String,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
