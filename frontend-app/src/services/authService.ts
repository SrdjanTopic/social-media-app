import _axios from "./_axios";

const url = import.meta.env.VITE_URL_BACK + "/auth";

async function isLoggedIn() {
  try {
    await _axios.get(`${url}`);
    return true;
  } catch (ex) {
    return false;
  }
}

async function login(loginCredentials: UserLogin) {
  try {
    const res = await _axios.post(`${url}/login`, loginCredentials);
    console.log(res);
    localStorage.setItem("token", res);
    window.location.reload();
  } catch (ex) {
    throw new Error("Incorrect username or password!");
  }
}

function logout() {
  try {
    localStorage.removeItem("token");
    window.location.reload();
  } catch (ex) {
    throw new Error("Error");
  }
}

const authService = {
  isLoggedIn,
  login,
  logout,
};

export default authService;
