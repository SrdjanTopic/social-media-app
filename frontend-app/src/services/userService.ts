import _axios from "./_axios";

const url = import.meta.env.VITE_URL_BACK + "/users";

async function register(registerCredentials: UserRegister) {
  try {
    const res = await _axios.post(`${url}`, registerCredentials);
    return res;
  } catch (ex) {
    throw new Error("Username already taken!");
  }
}

async function getUserById(userId: number): Promise<User> {
  try {
    const res = await _axios.get(`${url}/${userId}`);
    return res;
  } catch (ex) {
    throw new Error("User does not exist");
  }
}

async function getNonFriends(username: string | null, fullName: string | null) {
  let str = "";
  if (username !== null && fullName !== null)
    str = `?username=${username}&fullName=${fullName}`;
  else if (username !== null) str = `?username=${username}`;
  else if (fullName !== null) str = `?fullName=${fullName}`;
  try {
    const res = await _axios.get(`${url}${str}`);
    return res;
  } catch (ex) {
    throw new Error("Some error occured");
  }
}

const userService = {
  register,
  getUserById,
  getNonFriends,
};

export default userService;
