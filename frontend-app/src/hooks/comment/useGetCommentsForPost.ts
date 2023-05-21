import { useState, useEffect } from "react";
import commentService from "../../services/commentsService";

export default function useGetCommentsForPost(
  postId: number
): CustomStateHook<CommentWithUser[]> {
  const [comments, setComments] = useState<CommentWithUser[]>([]);

  useEffect(() => {
    commentService
      .getCommentsForPost(postId)
      .then((comments) => setComments(comments))
      .catch((err) => console.log(err));
  }, [postId]);

  return [comments, setComments];
}
