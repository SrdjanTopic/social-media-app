import _axios from "./_axios";

const url = import.meta.env.VITE_URL_BACK + "/friends";

async function isMyFriend(userId: number) {
  try {
    const res = await _axios.get(`${url}/areFriends/${userId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function getMyFriends() {
  try {
    const res = await _axios.get(`${url}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function getFriendsForUser(userId: number) {
  try {
    const res = await _axios.get(`${url}/${userId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function unfriendUser(userId: number): Promise<number> {
  try {
    const res = await _axios.deleteReq(`${url}/${userId}`);
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
