import "./App.css";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/fallbackPages/ErrorPage";
import useCurrentUser from "./hooks/user/useCurrentUser";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
]);

export const UserContext = React.createContext<User>({
  id: -1,
  username: "",
  fullName: "",
});

export default function App() {
  const currentUser = useCurrentUser();
  return currentUser !== null ? (
    <UserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Sidebar />
        <div className="mainContent">
          <RouterProvider router={router} />
        </div>
      </div>
    </UserContext.Provider>
  ) : (
    <h1>Login please</h1>
  );
}
