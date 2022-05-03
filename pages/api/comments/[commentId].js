import { comments } from "../../../data/comments";

export default function handler(req, res) {
  const { commentId } = req.query;

  if (req.method === "GET") {
    const comment = comments.find((comment) => comment.id == commentId);

    res.status(200).json(comment);
  } else if (req.method == "DELETE") {
    const comment = comments.find((comment) => comment.id == commentId);
    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.status(200).json(comments);
  } else if (req.method == "PUT") {
    const comment = comments.find((comment) => comment.id == commentId);
    const index = comments.indexOf(comment);

    comments[index].comment = req.body.comment;

    res.status(200).json(comments);
  }
}
