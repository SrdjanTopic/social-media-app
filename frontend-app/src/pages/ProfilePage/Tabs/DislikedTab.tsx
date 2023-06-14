import { useOutletContext } from "react-router-dom";
import Post from "../../../components/smallComponents/Post/Post";
import NotFriendsPage from "../../fallbackPages/NotFriendsPage";
import useGetDislikedPosts from "../../../hooks/post/useGetDislikedPosts";

export default function DislikedTab() {
  const user = useOutletContext<{ user: User }>().user;
  const [posts, setPosts] = useGetDislikedPosts(user.id);

  function setPost(post: Post) {
    setPosts(
      posts.map((postt) => {
        if (postt.id == post.id) return post;
        else return postt;
      })
    );
  }

  return (
    <>
      {user.isFriend !== false ? (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} setPost={setPost} />
          ))}
        </>
      ) : (
        <NotFriendsPage />
      )}
    </>
  );
}
