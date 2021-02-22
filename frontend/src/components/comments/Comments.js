import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import RepleyComments from "./RepleyComments";

const Comments = (props) => {
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state) => state.userSignin);

  const changeHandler = (e) => setComment(e.target.value);

  const submitCommentHandler = (e) => {
    e.preventDefault();
    // console.log(comment);

    const data = {
      content: comment,
      writer: userInfo._id,
      postId: props.postId,
    };
    // console.log(data);
    axios.post("/api/comment/saveComment", data).then((res) => {
      // console.log(res.data);
      if (res.data.success) {
        setComment("");
        props.refreshComments(res.data.savedComment);
      } else {
        console.log(res.data.error);
        alert("faild to send comment");
      }
    });
  };

  return (
    <div>
      <h4>please leave your Opinion</h4>
      <hr />
      <br />
      <form
        style={{ display: "flex", flexDirection: "column", margin: "10px" }}
        onSubmit={submitCommentHandler}
      >
        <textarea
          rows="4"
          value={comment}
          onChange={changeHandler}
          placeholder="write your comment"
        />
        <button
          style={{ marginTop: "5px", background: "#3777d6", color: "white" }}
          type="submit"
        >
          send
        </button>
      </form>
      <br />
      <hr />
      <p>replies</p>

      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  comment={comment}
                  refreshComments={props.refreshComments}
                />
                <RepleyComments
                  postId={props.postId}
                  commentList={props.commentList}
                  refreshComments={props.refreshComments}
                  parentCommentId={comment._id}
                />
              </React.Fragment>
            )
        )}
    </div>
  );
};

export default Comments;
