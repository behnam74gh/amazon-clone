import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const RepleyComments = (props) => {
  const [openRepleyComments, setOpenRepleyComments] = useState(false);
  const [childCommentNumber, setChildCommentNumber] = useState(0);

  useEffect(() => {
    let repleyCommentNumber = 0;
    props.commentList.map(
      (comment) =>
        comment.responseTo === props.parentCommentId && repleyCommentNumber++
    );
    setChildCommentNumber(repleyCommentNumber);
  }, [props.commentList, props.parentCommentId]);

  let renderRepleyComments = (parentCommentId) =>
    props.commentList.map((comment, index) => {
      return (
        comment.responseTo === parentCommentId && (
          <React.Fragment key={index}>
            <div style={{ marginLeft: "50px", width: "80%" }}>
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
            </div>
          </React.Fragment>
        )
      );
    });

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "13px", color: "#949ea7", cursor: "pointer" }}
          onClick={() => setOpenRepleyComments(!openRepleyComments)}
        >
          view {childCommentNumber} more comment(s)
        </p>
      )}
      {openRepleyComments && renderRepleyComments(props.parentCommentId)}
    </div>
  );
};

export default RepleyComments;
