import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const token = Cookies.get("ACCESS_TOKEN");
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
