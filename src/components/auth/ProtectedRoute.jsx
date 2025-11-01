import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { authStatus } = useAuth();

  return authStatus?.authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRoute;
