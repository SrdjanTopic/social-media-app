import _axios from "./_axios";

const url = import.meta.env.VITE_URL_BACK + "/postRatings";

async function removeRating(postId: number) {
  try {
    const res = await _axios.deleteReq(`${url}/${postId}`);
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function addRating(postId: number, isLiked: boolean) {
  try {
    const res = await _axios.post(`${url}`, { postId, isLiked });
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

async function updateRating(postId: number, isLiked: boolean) {
  try {
    const res = await _axios.put(`${url}`, { postId, isLiked });
    return res;
  } catch (ex) {
    throw new Error("error!");
  }
}

const postRatingService = {
  removeRating,
  addRating,
  updateRating,
};

export default postRatingService;
