import { useOutletContext } from "react-router-dom";
import NotFriendsPage from "../fallbackPages/NotFriendsPage";
import useGetUserPosts from "../../hooks/post/useGetUserPosts";
import Post from "../../components/smallComponents/Post/Post";

export default function PostsPage() {
  const user = useOutletContext<{ user: User }>().user;
  const [posts, setPosts] = useGetUserPosts(user.id);
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
