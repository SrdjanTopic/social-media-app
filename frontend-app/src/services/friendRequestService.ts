import _axios from "./_axios";

const url = import.meta.env.VITE_URL_BACK + "/friendRequests";

async function getFriendRequests() {
  try {
    const res = await _axios.get(`${url}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function getFriendRequestCount() {
  try {
    const res = await _axios.get(`${url}/count`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function amRequesting(addresseeId: number) {
  try {
    const res = await _axios.get(`${url}/amRequesting/${addresseeId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function amRequested(requesterId: number) {
  try {
    const res = await _axios.get(`${url}/amRequested/${requesterId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function sendFriendRequest(addresseeId: number) {
  try {
    const res = await _axios.post(`${url}`, { addresseeId });
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function acceptRequest(requesterId: number) {
  try {
    const res = await _axios.post(`${url}/${requesterId}`, {});
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

async function deleteRequest(requesterId: number) {
  try {
    const res = await _axios.deleteReq(`${url}/${requesterId}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

const friendRequestService = {
  getFriendRequests,
  getFriendRequestCount,
  amRequesting,
  amRequested,
  sendFriendRequest,
  acceptRequest,
  deleteRequest,
};

export default friendRequestService;
