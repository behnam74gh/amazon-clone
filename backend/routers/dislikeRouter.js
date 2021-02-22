import express from "express";
import expressAsyncHandler from "express-async-handler";
import Dislike from "../models/DislikeComment.js";
import Like from "../models/LikeComment.js";

const router = express.Router();

router.post(
  "/getdisLikes",
  expressAsyncHandler(async (req, res) => {
    try {
      const dislikes = await Dislike.find({
        commentId: req.body.commentId,
      }).exec();
      res.json({ success: true, dislikes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  })
);

router.post(
  "/updislike",
  expressAsyncHandler(async (req, res) => {
    try {
      // console.log(req.body);
      //add dislike information to db
      await new Dislike(req.body).save();
      //if like button already cliked ,we needto decrease the like by 1
      await Like.findOneAndDelete({
        commentId: req.body.commentId,
      }).exec();
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  })
);

router.post(
  "/undislike",
  expressAsyncHandler(async (req, res) => {
    try {
      await Dislike.findOneAndDelete({
        commentId: req.body.commentId,
      }).exec();
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  })
);

export default router;
