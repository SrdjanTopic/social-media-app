import { useState, useEffect } from "react";
import postService from "../../services/postService";

export default function useIsMyPost(postId: number) {
  const [isMyPost, setIsMyPost] = useState<boolean>(false);

  useEffect(() => {
    postService
      .isMyPost(postId)
      .then((isMyPost) => setIsMyPost(isMyPost))
      .catch((err) => console.log(err));
  }, [postId]);

  return isMyPost;
}
