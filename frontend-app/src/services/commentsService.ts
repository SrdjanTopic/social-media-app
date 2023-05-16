import _axios from "./_axios";

const url = import.meta.env.VITE_URL_BACK + "/comments";

async function isMyComment(commentId: number) {
  try {
    const res = await _axios.get(`${url}/check/${commentId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function getCommentsForPost(postId: number) {
  try {
    const res = await _axios.get(`${url}/${postId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function writeCommentForPost(commentInfo: WriteCommentForPost) {
  try {
    const res = await _axios.post(`${url}`, commentInfo);
    console.log(res);
    return res;
  } catch (ex) {
    throw new Error("Error!");
  }
}

async function deleteComment(commentId: number) {
  try {
    const res = await _axios.deleteReq(`${url}/${commentId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

const commentService = {
  getCommentsForPost,
  writeCommentForPost,
  isMyComment,
  deleteComment,
};

export default commentService;
