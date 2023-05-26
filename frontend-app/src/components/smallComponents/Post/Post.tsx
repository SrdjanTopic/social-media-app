import { useContext, useRef } from "react";
import useGetCommentsForPost from "../../../hooks/comment/useGetCommentsForPost";
import { getDateDiffString } from "../../../utils/functions";
// import Comment from "../Comment/Comment";
import styles from "./Post.module.css";
import commentService from "../../../services/commentsService";
import useGetPostPicture from "../../../hooks/img/useGetPostPicture";
import postRatingService from "../../../services/postRatingService";
import Comment from "../Comment/Comment";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";

type PostProps = {
  post: Post;
  setPost: (post: Post) => void;
};

export default function Post({ post, setPost }: PostProps) {
  const [comments, setComments] = useGetCommentsForPost(post.id);
  const writeCommentRef = useRef<HTMLTextAreaElement>(null);
  const postPicture = useGetPostPicture(post.id);
  const currentUser = useContext(UserContext);

  function handleComment() {
    if (writeCommentRef.current) {
      if (writeCommentRef.current.value == "") writeCommentRef.current.focus();
      else
        commentService
          .writeCommentForPost({
            postId: post.id,
            text: writeCommentRef.current.value,
          })
          .then((comment) => setComments([comment].concat(comments)));
    }
  }
  function deleteComment(commentId: number) {
    commentService
      .deleteComment(commentId)
      .then(() =>
        setComments(comments.filter((comment) => comment.id !== commentId))
      );
  }

  function handleLike() {
    if (post.isLiked) {
      postRatingService
        .removeRating(post.id)
        .then(() =>
          setPost({
            ...post,
            isLiked: undefined,
            likeCount: post.likeCount - 1,
          })
        )
        .catch((err) => console.log(err));
    } else if (post.isLiked == undefined) {
      postRatingService
        .addRating(post.id, true)
        .then(() =>
          setPost({
            ...post,
            isLiked: true,
            likeCount: post.likeCount + 1,
          })
        )
        .catch((err) => console.log(err));
    } else {
      postRatingService
        .updateRating(post.id, true)
        .then(() =>
          setPost({
            ...post,
            isLiked: true,
            likeCount: post.likeCount + 1,
            dislikeCount: post.dislikeCount - 1,
          })
        )
        .catch((err) => console.log(err));
    }
  }

  function handleDislike() {
    if (post.isLiked == false) {
      postRatingService
        .removeRating(post.id)
        .then(() =>
          setPost({
            ...post,
            isLiked: undefined,
            dislikeCount: post.dislikeCount - 1,
          })
        )
        .catch((err) => console.log(err));
    } else if (post.isLiked == undefined) {
      postRatingService
        .addRating(post.id, false)
        .then(() =>
          setPost({
            ...post,
            isLiked: false,
            dislikeCount: post.dislikeCount + 1,
          })
        )
        .catch((err) => console.log(err));
    } else {
      postRatingService
        .updateRating(post.id, false)
        .then(() =>
          setPost({
            ...post,
            isLiked: false,
            dislikeCount: post.dislikeCount + 1,
            likeCount: post.likeCount - 1,
          })
        )
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className={styles.card}>
      <Link to={`/profile/${post.userId}`} className={styles.user}>
        {post.fullName}
      </Link>
      {post.creationDate && (
        <div className={styles.date}>
          <time>
            {getDateDiffString(
              new Date(),
              new Date(
                post.creationDate.toString().slice(0, 19).replace(" ", "T")
              )
            )}
          </time>
          <div className={styles.dateTooltip}>
            {post.creationDate.toString().slice(0, 16)}
          </div>
        </div>
      )}
      <p className={styles.text}>{post.text}</p>
      {postPicture && <img src={postPicture} alt="PostPic" />}
      <div className={styles.buttonsWrapper}>
        <button
          type="button"
          className={`${styles.actionButton} ${
            post.isLiked == true ? styles.liked : ""
          }`}
          onClick={handleLike}
        >
          <svg
            className={styles.likeSvg}
            fill="hsla(0, 0%, 80%)"
            height="1.5rem"
            width="1.5rem"
            viewBox="0 0 512 512"
          >
            <g>
              <path
                d="M498.323,297.032c0-7.992-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914
		              c0-27.037-21.996-49.032-49.032-49.032H330.206c11.434-29.24,17.665-64.728,17.665-101.419c0-23.266-18.928-42.194-42.194-42.194
		              s-42.193,18.928-42.193,42.194c0,83.161-58.012,145.389-144.355,154.844c-0.592,0.065-1.159,0.197-1.7,0.38
		              C111.752,235.129,104.235,232,96,232H32c-17.645,0-32,14.355-32,32v152c0,17.645,14.355,32,32,32h64
		              c9.763,0,18.513-4.4,24.388-11.315c20.473,2.987,33.744,9.534,46.568,15.882c16.484,8.158,33.53,16.595,63.496,16.595h191.484
		              c27.037,0,49.032-21.996,49.032-49.032c0-7.991-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914
		              c0-7.991-1.901-15.683-5.553-22.635C491.126,326.766,498.323,312.507,498.323,297.032z M465.561,325.727H452c-4.418,0-8,3.582-8,8
		              s3.582,8,8,8h11.958c3.061,5.1,4.687,10.847,4.687,16.854c0,12.106-6.56,23.096-17.163,28.919h-14.548c-4.418,0-8,3.582-8,8
		              s3.582,8,8,8h13.481c2.973,5.044,4.553,10.71,4.553,16.629c0,18.214-14.818,33.032-33.032,33.032H230.452
		              c-26.223,0-40.207-6.921-56.398-14.935c-12.358-6.117-26.235-12.961-46.56-16.594c0.326-1.83,0.506-3.71,0.506-5.632V295
		              c0-4.418-3.582-8-8-8s-8,3.582-8,8v121c0,8.822-7.178,16-16,16H32c-8.822,0-16-7.178-16-16V264c0-8.822,7.178-16,16-16h64
		              c8.822,0,16,7.178,16,16c0,4.418,3.582,8,8,8s8-3.582,8-8c0-3.105-0.453-6.105-1.282-8.947
		              c44.778-6.106,82.817-25.325,110.284-55.813c27.395-30.408,42.481-70.967,42.481-114.208c0-14.443,11.75-26.194,26.193-26.194
		              c14.443,0,26.194,11.75,26.194,26.194c0,39.305-7.464,76.964-21.018,106.04c-1.867,4.004-0.134,8.764,3.871,10.631
		              c1.304,0.608,2.687,0.828,4.025,0.719c0.201,0.015,0.401,0.031,0.605,0.031h143.613c18.214,0,33.032,14.818,33.032,33.032
		              c0,11.798-6.228,22.539-16.359,28.469h-14.975c-4.418,0-8,3.582-8,8s3.582,8,8,8h12.835c3.149,5.155,4.822,10.984,4.822,17.079
		              C482.323,308.985,475.927,319.848,465.561,325.727z"
              />
              <path d="M422.384,325.727h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S426.802,325.727,422.384,325.727z" />
              <path d="M436.934,263.953h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S441.352,263.953,436.934,263.953z" />
              <path d="M407.833,387.5h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S412.252,387.5,407.833,387.5z" />
              <path d="M80,264c-8.822,0-16,7.178-16,16s7.178,16,16,16s16-7.178,16-16S88.822,264,80,264z" />
            </g>
          </svg>
          <span>
            {post.isLiked == true ? "Liked" : "Like"} ({post.likeCount})
          </span>
        </button>
        <button
          type="button"
          className={`${styles.actionButton} ${
            post.isLiked == false ? styles.disliked : ""
          }`}
          onClick={handleDislike}
        >
          <svg
            className={styles.dislikeSvg}
            fill="hsla(0, 0%, 80%)"
            height="1.5rem"
            width="1.5rem"
            viewBox="0 0 512 512"
          >
            <g>
              <path
                d="M498.323,297.032c0-7.992-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914
		              c0-27.037-21.996-49.032-49.032-49.032H330.206c11.434-29.24,17.665-64.728,17.665-101.419c0-23.266-18.928-42.194-42.194-42.194
		              s-42.193,18.928-42.193,42.194c0,83.161-58.012,145.389-144.355,154.844c-0.592,0.065-1.159,0.197-1.7,0.38
		              C111.752,235.129,104.235,232,96,232H32c-17.645,0-32,14.355-32,32v152c0,17.645,14.355,32,32,32h64
		              c9.763,0,18.513-4.4,24.388-11.315c20.473,2.987,33.744,9.534,46.568,15.882c16.484,8.158,33.53,16.595,63.496,16.595h191.484
		              c27.037,0,49.032-21.996,49.032-49.032c0-7.991-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914
		              c0-7.991-1.901-15.683-5.553-22.635C491.126,326.766,498.323,312.507,498.323,297.032z M465.561,325.727H452c-4.418,0-8,3.582-8,8
		              s3.582,8,8,8h11.958c3.061,5.1,4.687,10.847,4.687,16.854c0,12.106-6.56,23.096-17.163,28.919h-14.548c-4.418,0-8,3.582-8,8
		              s3.582,8,8,8h13.481c2.973,5.044,4.553,10.71,4.553,16.629c0,18.214-14.818,33.032-33.032,33.032H230.452
		              c-26.223,0-40.207-6.921-56.398-14.935c-12.358-6.117-26.235-12.961-46.56-16.594c0.326-1.83,0.506-3.71,0.506-5.632V295
		              c0-4.418-3.582-8-8-8s-8,3.582-8,8v121c0,8.822-7.178,16-16,16H32c-8.822,0-16-7.178-16-16V264c0-8.822,7.178-16,16-16h64
		              c8.822,0,16,7.178,16,16c0,4.418,3.582,8,8,8s8-3.582,8-8c0-3.105-0.453-6.105-1.282-8.947
		              c44.778-6.106,82.817-25.325,110.284-55.813c27.395-30.408,42.481-70.967,42.481-114.208c0-14.443,11.75-26.194,26.193-26.194
		              c14.443,0,26.194,11.75,26.194,26.194c0,39.305-7.464,76.964-21.018,106.04c-1.867,4.004-0.134,8.764,3.871,10.631
		              c1.304,0.608,2.687,0.828,4.025,0.719c0.201,0.015,0.401,0.031,0.605,0.031h143.613c18.214,0,33.032,14.818,33.032,33.032
		              c0,11.798-6.228,22.539-16.359,28.469h-14.975c-4.418,0-8,3.582-8,8s3.582,8,8,8h12.835c3.149,5.155,4.822,10.984,4.822,17.079
		              C482.323,308.985,475.927,319.848,465.561,325.727z"
              />
              <path d="M422.384,325.727h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S426.802,325.727,422.384,325.727z" />
              <path d="M436.934,263.953h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S441.352,263.953,436.934,263.953z" />
              <path d="M407.833,387.5h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S412.252,387.5,407.833,387.5z" />
              <path d="M80,264c-8.822,0-16,7.178-16,16s7.178,16,16,16s16-7.178,16-16S88.822,264,80,264z" />
            </g>
          </svg>
          <span>
            {post.isLiked == false ? "Disliked" : "Dislike"} (
            {post.dislikeCount})
          </span>
        </button>
        <button
          type="button"
          className={styles.actionButton}
          onClick={handleComment}
        >
          <svg
            className={styles.commentSvg}
            viewBox="0 0 121.86 122.88"
            fill="hsla(0, 0%, 80%)"
            height="1.3rem"
            width="1.3rem"
          >
            <path d="M30.28,110.09,49.37,91.78A3.84,3.84,0,0,1,52,90.72h60a2.15,2.15,0,0,0,2.16-2.16V9.82a2.16,2.16,0,0,0-.64-1.52A2.19,2.19,0,0,0,112,7.66H9.82A2.24,2.24,0,0,0,7.65,9.82V88.55a2.19,2.19,0,0,0,2.17,2.16H26.46a3.83,3.83,0,0,1,3.82,3.83v15.55ZM28.45,63.56a3.83,3.83,0,1,1,0-7.66h53a3.83,3.83,0,0,1,0,7.66Zm0-24.86a3.83,3.83,0,1,1,0-7.65h65a3.83,3.83,0,0,1,0,7.65ZM53.54,98.36,29.27,121.64a3.82,3.82,0,0,1-6.64-2.59V98.36H9.82A9.87,9.87,0,0,1,0,88.55V9.82A9.9,9.9,0,0,1,9.82,0H112a9.87,9.87,0,0,1,9.82,9.82V88.55A9.85,9.85,0,0,1,112,98.36Z" />
          </svg>
          <span>Comment ({comments.length})</span>
        </button>
      </div>
      <textarea
        placeholder="Write a comment"
        rows={3}
        cols={50}
        id={`writeComment-${post.id}`}
        ref={writeCommentRef}
      />

      {comments.length > 0 && (
        <div className={styles.commentsWrapper}>
          {comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              deleteComment={deleteComment}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
