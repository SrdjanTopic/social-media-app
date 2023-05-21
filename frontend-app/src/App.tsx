import "./App.css";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/fallbackPages/ErrorPage";
import useCurrentUser from "./hooks/user/useCurrentUser";
import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LogoutPage from "./pages/fallbackPages/LogoutPage";
import LoadingSpinner from "./components/shared/LoadingSpinner/LoadingSpinner";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

const routerLoggedIn = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <LogoutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LogoutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
]);

const routerNotLoggedIn = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

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
          <RouterProvider router={routerLoggedIn} />
        </div>
      </div>
    </UserContext.Provider>
  ) : (
    <RouterProvider router={routerNotLoggedIn} />
  );
}
