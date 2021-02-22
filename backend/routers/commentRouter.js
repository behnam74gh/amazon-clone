import express from "express";
import expressAsyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";

const router = express.Router();

router.post(
  "/saveComment",
  expressAsyncHandler(async (req, res) => {
    try {
      const comment = await new Comment(req.body).save();
      const savedComment = await Comment.findById(comment._id)
        .populate("writer")
        .exec();
      res.status(200).json({ success: true, savedComment });
    } catch (error) {
      console.log("daliiiiii --->", error);
      res.json({ success: false, error });
    }
  })
);

router.post(
  "/getComments",
  expressAsyncHandler(async (req, res) => {
    try {
      const allComments = await Comment.find({ postId: req.body.postId })
        .populate("writer")
        .exec();
      res.json({ success: true, allComments });
    } catch (error) {
      console.log("daliiiiii --->", error);
      res.json({ success: false, error });
    }
  })
);

export default router;
