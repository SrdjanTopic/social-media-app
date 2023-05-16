import axios from "axios";

const url = "http://localhost:9000/comments";

async function isMyComment(commentId: number) {
  try {
    const res = await axios.get(`${url}/check/${commentId}`);
    return res.data;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function getCommentsForPost(postId: number) {
  try {
    const res = await axios.get(`${url}/${postId}`);
    return res.data;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function writeCommentForPost(commentInfo: WriteCommentForPost) {
  try {
    const res = await axios.post(`${url}`, commentInfo);
    console.log(res.data);
    return res.data;
  } catch (ex) {
    throw new Error("Error!");
  }
}

async function deleteComment(commentId: number) {
  try {
    const res = await axios.delete(`${url}/${commentId}`);
    return res.data;
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
