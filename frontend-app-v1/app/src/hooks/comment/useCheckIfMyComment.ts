import { useState, useEffect } from "react";
import commentService from "../../services/commentsService";

export default function useCheckIfMyComment(commentId: number) {
  const [isMyComment, setIsMyComment] = useState<boolean>(false);

  useEffect(() => {
    commentService
      .isMyComment(commentId)
      .then((isMyComment) => setIsMyComment(isMyComment))
      .catch((err) => console.log(err));
  }, [commentId]);

  return isMyComment;
}
