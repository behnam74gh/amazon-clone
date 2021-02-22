import express from "express";
import expressAsyncHandler from "express-async-handler";
import Dislike from "../models/DislikeComment.js";
import Like from "../models/LikeComment.js";

const router = express.Router();

router.post(
  "/getLikes",
  expressAsyncHandler(async (req, res) => {
    try {
      const likes = await Like.find({ commentId: req.body.commentId }).exec();
      res.json({ success: true, likes });
    } catch (error) {
      console.log("daliiiiii --->", error);
      res.status(500).json({ success: false, error });
    }
  })
);

router.post(
  "/uplike",
  expressAsyncHandler(async (req, res) => {
    try {
      //add like information to db
      await new Like(req.body).save();
      //if dislike button already cliked ,we needto decrease the dislike by 1
      await Dislike.findOneAndDelete({
        commentId: req.body.commentId,
      }).exec();
      res.json({ success: true });
    } catch (error) {
      console.log("daliiiiii --->", error);
      res.status(500).json({ success: false, error });
    }
  })
);

router.post(
  "/unlike",
  expressAsyncHandler(async (req, res) => {
    try {
      await Like.findOneAndDelete({
        commentId: req.body.commentId,
      }).exec();
      res.json({ success: true });
    } catch (error) {
      console.log("daliiiiii --->", error);
      res.status(500).json({ success: false, error });
    }
  })
);

export default router;
