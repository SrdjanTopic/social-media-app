import { ChangeEvent, useState } from "react";
import styles from "./AddPostForm.module.css";
import imageService from "../../../services/imageService";
import postService from "../../../services/postService";

export default function AddPostForm() {
  const [postText, setPostText] = useState<string>("");
  const [loadedPostPicture, setLoadedPostPicture] = useState<string | null>(
    null
  );
  function handlePicUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function () {
        setLoadedPostPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  function handleCancelImageUpload() {
    setLoadedPostPicture(null);
  }
  function handleCreatePost() {
    if (postText != "")
      postService.createPost(postText).then((createdPost) => {
        if (loadedPostPicture != null)
          imageService.savePostPicture(loadedPostPicture, createdPost.id);
        alert("Post successfully created!");
        setLoadedPostPicture(null);
        setPostText("");
      });
  }

  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setPostText(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.textAndPicWrapper}>
        <textarea
          rows={3}
          placeholder="Write new post?"
          onChange={handleTextareaChange}
          value={postText}
        />
        <div className={styles.imgWrapper}>
          <label htmlFor="postPicture">
            <svg
              height="2rem"
              viewBox="0 0 24 24"
              width="2rem"
              fill="lightblue"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z" />
            </svg>
            <span className={styles.tootip}>Upload image</span>
          </label>
          <input
            type="file"
            name="postPicture"
            id="postPicture"
            onChange={handlePicUpload}
          />
        </div>
      </div>
      <div className={styles.imgWrapper}>
        {loadedPostPicture && (
          <>
            <img
              src={loadedPostPicture ? loadedPostPicture : ""}
              alt="Post pic"
            />
            <div className={styles.checkMarks}>
              <div className={styles.svgDiv}>
                <svg
                  height="2.5rem"
                  viewBox="0 0 100 100"
                  width="2.5rem"
                  stroke="pink"
                  strokeWidth="10"
                  fill="none"
                  className={styles.checkMark}
                  onClick={handleCancelImageUpload}
                >
                  <polyline points="25,25 75,75" />
                  <polyline points="25,75 75,25" />
                </svg>
                <span className={styles.tootip}>Cancel</span>
              </div>
            </div>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={handleCreatePost}
        disabled={postText == ""}
      >
        Post
      </button>
    </div>
  );
}
