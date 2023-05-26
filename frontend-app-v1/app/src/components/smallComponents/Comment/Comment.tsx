import { useRef } from "react";
import useCheckIfMyComment from "../../../hooks/comment/useCheckIfMyComment";
import { getDateDiffString } from "../../../utils/functions";
import styles from "./Comment.module.css";

type CommentProps = {
  comment: CommentWithUser;
  deleteComment: (commentId: number) => void;
};

export default function Comment({ comment, deleteComment }: CommentProps) {
  const isMyComment = useCheckIfMyComment(comment.id);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function showDialog() {
    dialogRef.current?.show();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function confirmCommentDeletion() {
    deleteComment(comment.id);
  }
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.textWrapper}>
        <div className={styles.headingWrapper}>
          <Link to={`/profile/${comment.username}`} className={styles.user}>
            {comment.fullName}
          </Link>
          {isMyComment && (
            <>
              <button
                type="button"
                onClick={showDialog}
                className={styles.deleteButton}
              >
                <svg
                  viewBox="0 0 100 100"
                  height="1.6rem"
                  width="1.6rem"
                  stroke="hsl(0, 70%, 50%)"
                  strokeWidth={15}
                  strokeLinecap="round"
                >
                  <line x1={10} y1={10} x2={90} y2={90} />
                  <line x1={10} y1={90} x2={90} y2={10} />
                </svg>
                <span>Delete comment</span>
              </button>
              <dialog ref={dialogRef}>
                <p>Confirm deletion</p>
                <div className={styles.dialogButtons}>
                  <button onClick={closeDialog}>cancel</button>
                  <button onClick={confirmCommentDeletion}>confirm</button>
                </div>
              </dialog>
            </>
          )}
        </div>

        <p>{comment.text}</p>
      </div>
      <div className={styles.date}>
        <time>
          {getDateDiffString(
            new Date(),
            new Date(
              comment.creationDate.toString().slice(0, 19).replace(" ", "T")
            )
          )}
        </time>
        <div className={styles.dateTooltip}>
          {comment.creationDate.toString().slice(0, 16)}
        </div>
      </div>
    </div>
  );
}
