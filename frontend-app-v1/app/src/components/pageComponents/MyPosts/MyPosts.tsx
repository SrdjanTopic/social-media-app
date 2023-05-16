import MyPost from "../../smallComponents/MyPost/MyPost";
import styles from "./MyPosts.module.css";

type MyPostsProps = {
  currentUser: User | null;
  myPosts: MyPost[];
  user: User;
  isMyFriend: boolean;
  deletePostFunction: (postId: number) => void;
};

export default function MyPosts({
  currentUser,
  myPosts,
  user,
  deletePostFunction,
  isMyFriend,
}: MyPostsProps) {
  return isMyFriend ? (
    <div className={styles.wrapper}>
      {myPosts.map((myPost) => (
        <MyPost
          key={myPost.id}
          post={myPost}
          currentUser={currentUser}
          user={user}
          deletePostFunction={deletePostFunction}
        />
      ))}
    </div>
  ) : (
    <h2>You must be friends to view this users posts!</h2>
  );
}
