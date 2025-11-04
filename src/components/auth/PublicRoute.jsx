import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const PublicRoute = () => {
  const { authStatus } = useAuth();

  // If already authenticated, redirect to home
  if (authStatus?.authenticated) {
    return <Navigate to="/home/homepage" replace />;
  }

  // Otherwise, render the child route (e.g. <SignIn />)
  return <Outlet />;
};

export default PublicRoute;
