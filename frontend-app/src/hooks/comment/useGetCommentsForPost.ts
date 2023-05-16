import { useState, useEffect } from "react";
import commentService from "../../services/commentsService";

type CustomStateHook = [
  CommentWithUser[],
  (newState: CommentWithUser[]) => void
];

export default function useGetCommentsForPost(postId: number): CustomStateHook {
  const [comments, setComments] = useState<CommentWithUser[]>([]);

  useEffect(() => {
    commentService
      .getCommentsForPost(postId)
      .then((comments) => setComments(comments))
      .catch((err) => console.log(err));
  }, [postId]);

  const customSetState = (newState: CommentWithUser[]) => {
    setComments(newState);
  };

  return [comments, customSetState];
}
