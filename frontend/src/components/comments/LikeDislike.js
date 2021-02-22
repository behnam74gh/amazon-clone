import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AiFillDislike,
  AiOutlineDislike,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai";

const LikeDislike = ({ commentId, userId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDisikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  useEffect(() => {
    axios.post("/api/like/getLikes", { commentId, userId }).then((res) => {
      if (res.data.success) {
        // console.log(res);

        //how many likes does this comment have
        setLikes(res.data.likes.length);

        //if I already clicked this like or not
        res.data.likes.map(
          (like) => like.userId === userId && setLikeAction("liked")
        );
      } else {
        console.log(res.data.error);
        alert("failed to get likes");
      }
    });

    axios
      .post("/api/dislike/getdisLikes", { commentId, userId })
      .then((res) => {
        if (res.data.success) {
          // console.log(res);
          //how many dislikes does this comment have
          setDisikes(res.data.dislikes.length);
          //if I already clicked this like or not
          res.data.dislikes.map(
            (dislike) =>
              dislike.userId === userId && setDislikeAction("disliked")
          );
        } else {
          console.log(res.data.error);
          alert("failed to get dislikes");
        }
      });
  }, [commentId, userId]);

  const onLikeHandler = () => {
    if (likeAction === null) {
      axios.post("/api/like/uplike", { commentId, userId }).then((res) => {
        if (res.data.success) {
          setLikes(likes + 1);
          setLikeAction("liked");

          //if dislike button already clicked
          if (dislikeAction !== null) {
            setDisikes(dislikes - 1);
            setDislikeAction(null);
          }
        } else {
          alert("faild to increase the like");
        }
      });
    } else {
      axios.post("/api/like/unlike", { commentId, userId }).then((res) => {
        if (res.data.success) {
          setLikes(likes - 1);
          setLikeAction(null);
        } else {
          alert("faild to decrease the like");
        }
      });
    }
  };

  const onDislikeHandler = () => {
    if (dislikeAction === null) {
      axios
        .post("/api/dislike/updislike", { commentId, userId })
        .then((res) => {
          if (res.data.success) {
            setDisikes(dislikes + 1);
            setDislikeAction("disliked");

            //if like button already clicked
            if (likeAction !== null) {
              setLikes(likes - 1);
              setLikeAction(null);
            }
          } else {
            alert("faild to increase the dislike");
          }
        });
    } else {
      axios
        .post("/api/dislike/undislike", { commentId, userId })
        .then((res) => {
          if (res.data.success) {
            setDisikes(dislikes - 1);
            setDislikeAction(null);
          } else {
            alert("faild to decrease the dislike");
          }
        });
    }
  };

  return (
    <React.Fragment>
      <span
        onClick={onLikeHandler}
        style={{ fontSize: "13px", cursor: "pointer", marginRight: "5px" }}
      >
        {likeAction === "liked" ? <AiFillLike /> : <AiOutlineLike />}
        &nbsp;{likes}
      </span>
      <span
        onClick={onDislikeHandler}
        style={{
          fontSize: "13px",
          cursor: "pointer",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        {dislikeAction === "disliked" ? (
          <AiFillDislike />
        ) : (
          <AiOutlineDislike />
        )}
        &nbsp;{dislikes}
      </span>
    </React.Fragment>
  );
};

export default LikeDislike;
