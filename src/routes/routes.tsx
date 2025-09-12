import { createBrowserRouter, RouterProvider } from "react-router";
import Note from "../pages/note/Note";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
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
