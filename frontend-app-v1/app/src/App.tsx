import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./pages/fallbackPages/ErrorPage";
import HomePage from "./pages/HomePage";
import axios from "axios";
import RegisterPage from "./pages/RegisterPage";
import useAuth from "./hooks/auth/useAuth";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/fallbackPages/LogoutPage";
import authService from "./services/authService";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import useCurrentUser from "./hooks/user/useCurrentUser";
import NonExistingUserTabPage from "./pages/fallbackPages/NonExistingUserTabPage";
import MyPostsPage from "./pages/MyPostsPage";
import AboutPage from "./pages/AboutPage";
import FriendsPage from "./pages/FriendsPage";
import LikedPage from "./pages/LikedPage";
import DislikedPage from "./pages/DislikedPage";
import useGetFrientRequestCount from "./hooks/friendRequest/useGetFrientRequestCount";
import FriendRequestsPage from "./pages/FriendRequestsPage";
import UsersFriendsPage from "./pages/UsersFriendsPage";
import UsersPage from "./pages/UsersPage";

function App() {
  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      const token = localStorage.getItem("token");
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  }, []);
  const isLoggedIn: boolean | null = useAuth();
  const currentUser: User | null = useCurrentUser();
  const friendRequestCount = useGetFrientRequestCount();

  function handleLogout() {
    authService.logout();
  }

  return isLoggedIn === null ? (
    <div>Loading...</div>
  ) : (
    <div className="wrapper">
      {isLoggedIn && (
        <div className="sidebar">
          <Link className="sidebarOptionWrapper" to={""}>
            <svg viewBox="0 -20 300 300" fill="lightblue" strokeLinecap="round">
              <rect x="75" y="120" width="150" height="120" fill="lightblue" />
              <polygon points="150,10 25,120 275,120" fill="lightblue" />
              <rect
                x="100"
                y="160"
                width="50"
                height="90"
                fill="hsl(0, 0%, 14%)"
              />
            </svg>
            <span>Home</span>
          </Link>
          <Link
            className="sidebarOptionWrapper"
            to={`/profile/${currentUser?.username}`}
          >
            <svg
              viewBox="0 0 122.88 122.88"
              fill="lightblue"
              style={{ padding: "3px" }}
            >
              <g>
                <path d="M61.44,0c8.32,0,16.25,1.66,23.5,4.66l0.11,0.05c7.47,3.11,14.2,7.66,19.83,13.3l0,0c5.66,5.65,10.22,12.42,13.34,19.95 c3.01,7.24,4.66,15.18,4.66,23.49c0,8.32-1.66,16.25-4.66,23.5l-0.05,0.11c-3.12,7.47-7.66,14.2-13.3,19.83l0,0 c-5.65,5.66-12.42,10.22-19.95,13.34c-7.24,3.01-15.18,4.66-23.49,4.66c-8.31,0-16.25-1.66-23.5-4.66l-0.11-0.05 c-7.47-3.11-14.2-7.66-19.83-13.29L18,104.87C12.34,99.21,7.78,92.45,4.66,84.94C1.66,77.69,0,69.76,0,61.44s1.66-16.25,4.66-23.5 l0.05-0.11c3.11-7.47,7.66-14.2,13.29-19.83L18.01,18c5.66-5.66,12.42-10.22,19.94-13.34C45.19,1.66,53.12,0,61.44,0L61.44,0z M16.99,94.47l0.24-0.14c5.9-3.29,21.26-4.38,27.64-8.83c0.47-0.7,0.97-1.72,1.46-2.83c0.73-1.67,1.4-3.5,1.82-4.74 c-1.78-2.1-3.31-4.47-4.77-6.8l-4.83-7.69c-1.76-2.64-2.68-5.04-2.74-7.02c-0.03-0.93,0.13-1.77,0.48-2.52 c0.36-0.78,0.91-1.43,1.66-1.93c0.35-0.24,0.74-0.44,1.17-0.59c-0.32-4.17-0.43-9.42-0.23-13.82c0.1-1.04,0.31-2.09,0.59-3.13 c1.24-4.41,4.33-7.96,8.16-10.4c2.11-1.35,4.43-2.36,6.84-3.04c1.54-0.44-1.31-5.34,0.28-5.51c7.67-0.79,20.08,6.22,25.44,12.01 c2.68,2.9,4.37,6.75,4.73,11.84l-0.3,12.54l0,0c1.34,0.41,2.2,1.26,2.54,2.63c0.39,1.53-0.03,3.67-1.33,6.6l0,0 c-0.02,0.05-0.05,0.11-0.08,0.16l-5.51,9.07c-2.02,3.33-4.08,6.68-6.75,9.31C73.75,80,74,80.35,74.24,80.7 c1.09,1.6,2.19,3.2,3.6,4.63c0.05,0.05,0.09,0.1,0.12,0.15c6.34,4.48,21.77,5.57,27.69,8.87l0.24,0.14 c6.87-9.22,10.93-20.65,10.93-33.03c0-15.29-6.2-29.14-16.22-39.15c-10-10.03-23.85-16.23-39.14-16.23 c-15.29,0-29.14,6.2-39.15,16.22C12.27,32.3,6.07,46.15,6.07,61.44C6.07,73.82,10.13,85.25,16.99,94.47L16.99,94.47L16.99,94.47z" />
              </g>
            </svg>
            <span>{currentUser?.fullName}</span>
          </Link>
          <Link className="sidebarOptionWrapper" to={"friends"}>
            <svg viewBox="0 0 1280 1024" fill="lightblue">
              <path d="M384 512c123.8 0 224-100.2 224-224S507.8 64 384 64 160 164.2 160 288s100.2 224 224 224z m153.6 64h-16.6c-41.6 20-87.8 32-137 32s-95.2-12-137-32h-16.6C103.2 576 0 679.2 0 806.4V864c0 53 43 96 96 96h576c53 0 96-43 96-96v-57.6c0-127.2-103.2-230.4-230.4-230.4zM960 512c106 0 192-86 192-192s-86-192-192-192-192 86-192 192 86 192 192 192z m96 64h-7.6c-27.8 9.6-57.2 16-88.4 16s-60.6-6.4-88.4-16H864c-40.8 0-78.4 11.8-111.4 30.8 48.8 52.6 79.4 122.4 79.4 199.6v76.8c0 4.4-1 8.6-1.2 12.8H1184c53 0 96-43 96-96 0-123.8-100.2-224-224-224z" />
            </svg>
            <span>Friends</span>
          </Link>
          <Link className="sidebarOptionWrapper" to={"friendRequests"}>
            <svg viewBox="-200 0 1280 1024" fill="lightblue">
              <path d="M384 512c123.8 0 224-100.2 224-224S507.8 64 384 64 160 164.2 160 288s100.2 224 224 224z m153.6 64h-16.6c-41.6 20-87.8 32-137 32s-95.2-12-137-32h-16.6C103.2 576 0 679.2 0 806.4V864c0 53 43 96 96 96h576c53 0 96-43 96-96v-57.6c0-127.2-103.2-230.4-230.4-230.4zM960 512c106" />
              <circle cx="50" cy="900" r="250" fill="white" />
              <line
                x1="-100"
                y1="900"
                x2="200"
                y2="900"
                stroke="blue"
                strokeWidth={100}
                strokeLinecap="round"
              />
              <line
                x1="50"
                y1="750"
                x2="50"
                y2="1050"
                stroke="blue"
                strokeWidth={100}
                strokeLinecap="round"
              />
              {friendRequestCount > 0 && (
                <circle cx="850" cy="900" r="200" fill="red" />
              )}
            </svg>
            <span>Friend requests</span>
          </Link>
          <Link className="sidebarOptionWrapper" to={"users"}>
            <svg fill="lightblue" viewBox="0 0 476.267 476.267">
              <g>
                <path
                  d="M287.039,244.883l-48.63-14.498c-12.919,15.373-29.208,25.976-47.615,25.976c-18.407,0-34.696-10.603-47.614-25.976
		l-48.631,14.498c-9.266,2.768-15.584,11.197-15.811,20.822c4.825,7.218,10.385,14.084,16.75,20.449
		c25.453,25.454,59.305,39.474,95.306,39.474c36.003,0,69.853-14.02,95.315-39.474c6.364-6.366,11.917-13.232,16.742-20.441
		C302.631,256.08,296.305,247.65,287.039,244.883z"
                />
                <path
                  d="M469.183,435.26L341.534,307.611c58.015-74.796,52.854-183.074-15.795-251.715C289.697,19.854,241.77,0,190.793,0
		C139.817,0,91.89,19.854,55.849,55.896c-74.404,74.413-74.404,195.476,0,269.889c36.041,36.049,83.968,55.895,134.944,55.895
		c42.868,0,83.483-14.192,116.78-40.091l127.641,127.641c4.692,4.692,10.839,7.039,16.985,7.039c6.147,0,12.291-2.346,16.983-7.039
		C478.567,459.853,478.567,444.637,469.183,435.26z M78.495,303.138c-61.909-61.924-61.909-162.673,0-224.597
		c29.997-29.988,69.877-46.512,112.298-46.512s82.303,16.524,112.299,46.512c61.916,61.924,61.916,162.673,0,224.597
		c-29.996,29.997-69.877,46.512-112.299,46.512S108.492,333.135,78.495,303.138z"
                />
                <path
                  d="M118.846,185.922c4.338,5.463,9.861,8.751,15.138,8.653c11.915,27.326,32.92,50.789,56.913,50.789
		c23.993,0,44.998-23.464,56.913-50.789c5.278,0.098,10.8-3.19,15.138-8.653c2.294-2.885,4.284-6.31,5.66-10.266
		c2.579-7.401,2.54-14.738,0.508-20.371c-1.595-4.414-4.393-7.806-8.315-9.183c-0.639,0.208-1.278,0.437-1.971,0.491
		c-0.214,0.017-0.426,0.022-0.64,0.022c-1.273,0-2.453-0.389-3.562-0.923c-2.108-1.022-3.824-2.814-4.523-5.163
		c-0.169-0.563-4.442-13.837-29.68-13.837c-2.426,0-4.993,0.125-7.698,0.371c0,0-2.639,0.235-6.708,0.235
		c-13.462,0-31.593-2.327-41.519-13.396c-2.099-2.343-3.715-4.965-4.835-7.822c-9.331,5.927-22.748,17.126-27.91,34.722
      c-0.656,2.224-2.207,3.901-4.13,4.933c-1.196,0.645-2.502,1.093-3.917,1.093c-0.328,0-0.655-0.017-0.989-0.061
      c-0.677-0.081-1.283-0.344-1.9-0.579c-3.825,1.42-6.567,4.747-8.14,9.096c-2.032,5.632-2.071,12.969,0.508,20.371
      C114.563,179.612,116.552,183.037,118.846,185.922z"
                />
                <path
                  d="M166.331,93.063c-2.551,23.293,26.725,25.844,39.688,25.844c3.639,0,5.993-0.202,5.993-0.202
		c2.988-0.279,5.79-0.404,8.413-0.404c32.826,0,37.776,20.032,37.776,20.032l2.033-15.083c4.277-31.702-17.777-60.935-49.429-65.529
		c-1.847-0.268-3.699-0.399-5.539-0.399c-10.576,0-20.781,4.349-28.124,12.183l-0.557,0.595c-4.857-2.218-10.042-3.311-15.203-3.311
		c-7.43,0-14.811,2.262-21.088,6.687c-11.947,8.419-18.737,22.377-18,36.969l1.409,27.992
		C133.247,105.923,166.331,93.063,166.331,93.063z"
                />
              </g>
            </svg>
            <span>Search users</span>
          </Link>

          <button type="button" onClick={handleLogout}>
            <span>Logout</span>
            <svg fill="white" viewBox="0 0 490.3 490.3" stroke="white">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path d="M0,121.05v248.2c0,34.2,27.9,62.1,62.1,62.1h200.6c34.2,0,62.1-27.9,62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3 s-12.3,5.5-12.3,12.3v40.2c0,20.7-16.9,37.6-37.6,37.6H62.1c-20.7,0-37.6-16.9-37.6-37.6v-248.2c0-20.7,16.9-37.6,37.6-37.6h200.6 c20.7,0,37.6,16.9,37.6,37.6v40.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1 C27.9,58.95,0,86.75,0,121.05z"></path>{" "}
                    <path d="M385.4,337.65c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l83.9-83.9c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9 c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l63,63H218.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h229.8l-63,63 C380.6,325.15,380.6,332.95,385.4,337.65z"></path>{" "}
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      )}
      <div className={isLoggedIn ? "mainContent" : "mainContentWithoutSidebar"}>
        <Routes>
          <Route path="/">
            <Route index element={isLoggedIn ? <HomePage /> : <LoginPage />} />
            <Route
              path="register"
              element={isLoggedIn ? <LogoutPage /> : <RegisterPage />}
            />
            <Route
              path="profile/:username"
              element={
                isLoggedIn ? (
                  <ProfilePage currentUser={currentUser} />
                ) : (
                  <LoginPage />
                )
              }
            >
              <Route path="posts" element={<MyPostsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="friends" element={<UsersFriendsPage />} />
              <Route path="liked" element={<LikedPage />} />
              <Route path="disliked" element={<DislikedPage />} />
              <Route path="*" element={<NonExistingUserTabPage />} />
            </Route>
            <Route
              path="/friendRequests"
              element={isLoggedIn ? <FriendRequestsPage /> : <LoginPage />}
            />
            <Route
              path="/friends"
              element={isLoggedIn ? <FriendsPage /> : <LoginPage />}
            />
            <Route
              path="/users"
              element={isLoggedIn ? <UsersPage /> : <LoginPage />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
