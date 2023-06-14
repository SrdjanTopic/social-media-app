import { useOutletContext } from "react-router-dom";
import useGetLikedPosts from "../../../hooks/post/useGetLikedPosts";
import Post from "../../../components/smallComponents/Post/Post";
import NotFriendsPage from "../../fallbackPages/NotFriendsPage";

export default function LikedTab() {
  const user = useOutletContext<{ user: User }>().user;
  const [posts, setPosts] = useGetLikedPosts(user.id);

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
