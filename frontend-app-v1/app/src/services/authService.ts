import axios from "axios";

const url = "http://localhost:9000/auth";

async function isLoggedIn() {
  try {
    await axios.get(`${url}`);
    return true;
  } catch (ex) {
    return false;
  }
}

async function login(loginCredentials: UserLogin) {
  try {
    const res = await axios.post(`${url}/login`, loginCredentials);
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
