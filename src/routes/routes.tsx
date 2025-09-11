import { createBrowserRouter, RouterProvider } from "react-router";
import Note from "../pages/Note";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicRoute from "./visibility/PublicRoute";
import PrivateRoute from "./visibility/PrivateRoute";

const createRouter = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/note",
        element: <Note />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={createRouter} />;
};

export default Router;
