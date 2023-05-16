import { useState, useEffect } from "react";
import postRatingService from "../../services/postRatingService";

type CustomStateHook = [boolean | null, (newState: boolean | null) => void];

export default function useGetIsLikedByMe(postId: number): CustomStateHook {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  useEffect(() => {
    postRatingService
      .getIsLikedByMe(postId)
      .then((isLiked) => setIsLiked(isLiked))
      .catch((err) => console.log(err));
  }, [postId]);

  const customSetState = (newState: boolean | null) => {
    setIsLiked(newState);
  };

  return [isLiked, customSetState];
}
