import axios from "axios";

const url = "http://localhost:9000/postRatings";

async function getIsLikedByMe(postId: number) {
  try {
    const res = await axios.get(`${url}/${postId}`);
    return res.data;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function removeRating(postId: number) {
  try {
    const res = await axios.delete(`${url}/${postId}`);
    return res.data;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function addRating(postId: number, isLiked: boolean) {
  try {
    const res = await axios.post(`${url}`, { postId, isLiked });
    return res.data;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function updateRating(postId: number, isLiked: boolean) {
  try {
    const res = await axios.put(`${url}`, { postId, isLiked });
    return res.data;
  } catch (ex) {
    throw new Error("error!");
  }
}

const postRatingService = {
  getIsLikedByMe,
  removeRating,
  addRating,
  updateRating,
};

export default postRatingService;
