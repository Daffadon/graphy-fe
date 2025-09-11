import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const token = Cookies.get("ACCESS_TOKEN");
  if (token) {
    return <Navigate to={"/note"} />;
  }
  return <Outlet />;
};

export default PublicRoute;
