import _axios from "./_axios";

const url = import.meta.env.VITE_URL_BACK + "/posts";

async function getFriendPosts(): Promise<Post[]> {
  try {
    const res = await _axios.get(`${url}/fromFriends`);
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function getUserPosts(userID: number): Promise<Post[]> {
  try {
    const res = await _axios.get(`${url}/${userID}`);
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function getLikedByUserPosts(userID: number): Promise<Post[]> {
  try {
    const res = await _axios.get(`${url}/${userID}/liked`);
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function getDislikedByUserPosts(userID: number): Promise<Post[]> {
  try {
    const res = await _axios.get(`${url}/${userID}/disliked`);
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function deletePost(postId: number) {
  try {
    const res = await _axios.deleteReq(`${url}/${postId}`);
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function createPost(text: string) {
  try {
    const res = await _axios.post(`${url}`, { text });
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function updatePost(postId: number, text: string) {
  try {
    const res = await _axios.put(`${url}/${postId}`, { text });
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

const postService = {
  getFriendPosts,
  getUserPosts,
  getLikedByUserPosts,
  getDislikedByUserPosts,
  deletePost,
  createPost,
  updatePost,
};

export default postService;
