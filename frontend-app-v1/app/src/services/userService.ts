import axios from "axios";

const url = "http://localhost:9000/users";

async function register(registerCredentials: UserRegister) {
  try {
    const res = await axios.post(`${url}`, registerCredentials);
    return res;
  } catch (ex) {
    throw new Error("Username already taken!");
  }
}

async function getUserByUsername(username: string) {
  try {
    const res = await axios.get(`${url}/${username}`);
    return res;
  } catch (ex) {
    throw new Error("Username already taken!");
  }
}

async function getNonFriends(username: string | null, fullName: string | null) {
  let str = "";
  if (username !== null && fullName !== null)
    str = `?username=${username}&fullName=${fullName}`;
  else if (username !== null) str = `?username=${username}`;
  else if (fullName !== null) str = `?fullName=${fullName}`;
  try {
    const res = await axios.get(`${url}${str}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

const userService = {
  register,
  getUserByUsername,
  getNonFriends,
};

export default userService;
