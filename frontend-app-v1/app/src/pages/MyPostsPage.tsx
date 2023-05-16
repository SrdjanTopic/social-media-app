import MyPosts from "../components/pageComponents/MyPosts/MyPosts";
import useGetUserPosts from "../hooks/post/useGetMyPosts";
import postService from "../services/postService";
import { useUsers } from "../components/pageComponents/Profile/Profile";

export default function MyPostsPage() {
  const users = useUsers();
  const [myPosts, setMyPosts] = useGetUserPosts(users.user.id);

  function deletePostFunction(postId: number) {
    postService
      .deletePost(postId)
      .then((res) => {
        if (res == 0) alert("An error occured while trying to delete post!");
        else setMyPosts(myPosts.filter((post) => post.id !== postId));
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <MyPosts
        user={users.user}
        currentUser={users.currentUser}
        isMyFriend={users.isMyFriend}
        myPosts={myPosts}
        deletePostFunction={deletePostFunction}
      />
    </>
  );
}
