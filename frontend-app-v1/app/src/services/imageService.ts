import axios from "axios";

const url = "http://localhost:9000/img";

async function getUserProfilePicture(userId: number) {
  try {
    const res = await axios.get(`${url}/user/${userId}`);
    return res.data;
  } catch (err) {
    throw new Error("Error");
  }
}

async function saveUserProfilePicture(image: string | null) {
  if (image) {
    try {
      const res = await axios.post(`${url}/user`, {
        image: image.split("base64,")[1],
      });
      window.location.reload();
      return res.data;
    } catch (err) {
      throw new Error("Error");
    }
  } else alert("Upload aa profile picture to change it!");
}

async function getPostPicture(postId: number) {
  try {
    const res = await axios.get(`${url}/post/${postId}`);
    return res.data;
  } catch (err) {
    throw new Error("Error");
  }
}

async function savePostPicture(image: string | null, postId: number) {
  if (image) {
    try {
      const res = await axios.post(`${url}/post/${postId}`, {
        image: image.split("base64,")[1],
      });
      window.location.reload();
      return res.data;
    } catch (err) {
      throw new Error("Error");
    }
  } else alert("Upload a profile picture to change it!");
}

const imageService = {
  getUserProfilePicture,
  getPostPicture,
  saveUserProfilePicture,
  savePostPicture,
};

export default imageService;
