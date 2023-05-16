import AddPostForm from "../../smallComponents/AddPostForm/AddPostForm";
import Post from "../../smallComponents/Post/Post";
import styles from "./Home.module.css";

type HomeProps = {
  posts: Post[];
};

export default function Home({ posts }: HomeProps) {
  return (
    <div className={styles.wrapper}>
      <AddPostForm />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
