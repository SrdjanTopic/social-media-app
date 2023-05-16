import axios from "axios";

const url = "http://localhost:9000/friends";

async function isMyFriend(userId: number) {
  try {
    const res = await axios.get(`${url}/areFriends/${userId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function getMyFriends() {
  try {
    const res = await axios.get(`${url}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function getFriendsForUser(userId: number) {
  try {
    const res = await axios.get(`${url}/${userId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function unfriendUser(userId: number) {
  try {
    const res = await axios.delete(`${url}/${userId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

const friendService = {
  isMyFriend,
  getMyFriends,
  getFriendsForUser,
  unfriendUser,
};

export default friendService;
