import axios from "axios";

const url = "http://localhost:9000/posts";

async function getFriendPosts() {
  try {
    const res = await axios.get(`${url}/fromFriends`);
    return res.data;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function getUserPosts(userID: number) {
  try {
    const res = await axios.get(`${url}/${userID}`);
    return res.data;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function deletePost(postId: number) {
  try {
    const res = await axios.delete(`${url}/${postId}`);
    return res.data;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function createPost(text: string) {
  try {
    const res = await axios.post(`${url}`, { text });
    return res.data;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function updatePost(postId: number, text: string) {
  try {
    const res = await axios.put(`${url}/${postId}`, { text });
    return res.data;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function isMyPost(postId: number) {
  try {
    const res = await axios.get(`${url}/isMyPost/${postId}`);
    return res.data;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

const postService = {
  getFriendPosts,
  getUserPosts,
  deletePost,
  createPost,
  updatePost,
  isMyPost,
};

export default postService;
