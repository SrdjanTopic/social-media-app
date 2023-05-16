import "./App.css";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export default function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="mainContent">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
