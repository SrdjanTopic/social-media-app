import Post from "../components/smallComponents/Post/Post";
import useGetFriendPosts from "../hooks/post/useGetFriendPosts";

export default function HomePage() {
  const [posts, setPosts] = useGetFriendPosts();
  function setPost(post: Post) {
    setPosts(
      posts.map((postt) => {
        if (postt.id == post.id) return post;
        else return postt;
      })
    );
  }

  return (
    <div style={{ width: "70%" }}>
      {/* <AddPostForm /> */}
      {posts.map((post) => (
        <Post key={post.id} post={post} setPost={setPost} />
      ))}
    </div>
  );
}
