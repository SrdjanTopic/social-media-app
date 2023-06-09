import _axios from "./_axios";

const url = import.meta.env.VITE_URL_BACK + "/myProfile";

async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await _axios.get(`${url}`);
    return res;
  } catch (err) {
    return null;
  }
}

async function updateProfile(userCredentials: UpdateUser): Promise<UpdateUser> {
  try {
    const res = await _axios.put(`${url}/update`, userCredentials);
    return res;
  } catch (ex) {
    throw new Error("Username already taken!");
  }
}

async function changePassword(passwords: UpdatePassword) {
  try {
    const res = await _axios.put(`${url}/changePassword`, passwords);
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
