import { createBrowserRouter, RouterProvider } from "react-router";
import Note from "../pages/Note";
import Login from "../pages/Login";
import Register from "../pages/Register";

const createRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/note",
    element: <Note />,
  },
]);

const Router = () => {
  return <RouterProvider router={createRouter} />;
};

export default Router;
