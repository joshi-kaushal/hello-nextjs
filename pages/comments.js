import { useState } from "react";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  return (
    <>
      <button onClick={fetchComments}>Load Comments</button>

      {comments.map((comment) => (
        <div key={comment.id}>{comment.comment}</div>
      ))}
    </>
  );
}
