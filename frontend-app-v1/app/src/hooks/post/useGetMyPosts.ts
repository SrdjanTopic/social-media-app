import { useState, useEffect } from "react";
import postService from "../../services/postService";

type CustomStateHook = [MyPost[], (newState: MyPost[]) => void];

export default function useGetUserPosts(userId: number): CustomStateHook {
  const [posts, setPosts] = useState<MyPost[]>([]);

  useEffect(() => {
    postService
      .getUserPosts(userId)
      .then((posts) => setPosts(posts))
      .catch((err) => console.log(err));
  }, []);

  const customSetState = (newState: MyPost[]) => {
    setPosts(newState);
  };

  return [posts, customSetState];
}
