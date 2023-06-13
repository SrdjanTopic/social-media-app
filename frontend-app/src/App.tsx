import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoadingSpinner from "./components/shared/LoadingSpinner/LoadingSpinner";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import useCurrentUser from "./hooks/user/useCurrentUser";
import ErrorPage from "./pages/fallbackPages/ErrorPage";
import LogoutPage from "./pages/fallbackPages/LogoutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import FriendsTab from "./pages/ProfilePage/Tabs/FriendsTab";
import AboutTab from "./pages/ProfilePage/Tabs/AboutTab";
import PostsTab from "./pages/ProfilePage/Tabs/PostsTab";
import FriendsPage from "./pages/FriendsPage";

export const UserContext = React.createContext<User>({
  id: -1,
  username: "",
  fullName: "",
});

export default function App() {
  const currentUser = useCurrentUser();
  return typeof currentUser === "undefined" ? (
    <LoadingSpinner />
  ) : currentUser !== null ? (
    <UserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Sidebar />
        <div className="mainContent">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/register"
              element={<LogoutPage />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/login"
              element={<LogoutPage />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/profile/:userId"
              element={<ProfilePage />}
              errorElement={<ErrorPage />}
            >
              <Route path="about" element={<AboutTab />} />
              <Route path="friends" element={<FriendsTab />} />
              <Route path="posts" element={<PostsTab />} />
              <Route path="liked" element={<h2>Liked</h2>} />
              <Route path="disliked" element={<h2>Disliked</h2>} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route
              path="/friends"
              element={<FriendsPage />}
              errorElement={<ErrorPage />}
            />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  ) : (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<LoginPage />} />
    </Routes>
  );
}
