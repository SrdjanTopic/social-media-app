import Home from "../components/pageComponents/Home/Home";
import useGetFriendPosts from "../hooks/post/useGetFriendPosts";

export default function HomePage() {
  const friendPosts = useGetFriendPosts();
  return <Home posts={friendPosts} />;
}
