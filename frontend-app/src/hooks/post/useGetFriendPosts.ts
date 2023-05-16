import { useState, useEffect } from "react";
import postService from "../../services/postService";

export default function useGetFriendPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postService
      .getFriendPosts()
      .then((posts) => setPosts(posts))
      .catch((err) => console.log(err));
  }, []);

  return posts;
}
