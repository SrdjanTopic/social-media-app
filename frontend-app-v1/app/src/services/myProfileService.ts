import axios from "axios";

const url = "http://localhost:9000/myProfile";

async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await axios.get(`${url}`);
    return res;
  } catch (err) {
    throw new Error("Error");
  }
}

async function updateProfile(userCredentials: UpdateUser) {
  try {
    const res = await axios.put(`${url}/update`, userCredentials);
    return res;
  } catch (ex) {
    throw new Error("Username already taken!");
  }
}

async function changePassword(passwords: UpdatePassword) {
  console.log(passwords);
  try {
    const res = await axios.put(`${url}/changePassword`, passwords);
    return res;
  } catch (ex) {
    console.log(ex);
    throw new Error("Error");
  }
}

const myProfileService = {
  getCurrentUser,
  updateProfile,
  changePassword,
};

export default myProfileService;
