import { useState, useEffect } from "react";
import postService from "../../services/postService";

type CustomStateHook = [Post[], (newState: Post[]) => void];

export default function useGetUserPosts(userId: number): CustomStateHook {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postService
      .getUserPosts(userId)
      .then((posts) => setPosts(posts))
      .catch((err) => console.log(err));
  }, [userId]);

  const customSetState = (newState: Post[]) => {
    setPosts(newState);
  };

  return [posts, customSetState];
}
