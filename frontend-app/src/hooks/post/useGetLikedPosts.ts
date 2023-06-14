import { useState, useEffect } from "react";
import postService from "../../services/postService";

type CustomStateHook = [Post[], (newState: Post[]) => void];

export default function useGetLikedPosts(userId: number): CustomStateHook {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postService
      .getLikedByUserPosts(userId)
      .then((posts) => setPosts(posts))
      .catch((err) => console.log(err));
  }, [userId]);

  return [posts, setPosts];
}
