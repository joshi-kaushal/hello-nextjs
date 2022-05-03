import { useState } from "react";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const deleteComment = async (commentId) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
  };

  const submitComment = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter comment"
      />
      <button onClick={submitComment}>Post</button>
      <hr />
      <button onClick={fetchComments}>Load Comments</button>

      {comments.map((comment) => (
        <div key={comment.id}>
          {comment.id}:{comment.comment}
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
