import { useAuth } from "@/context/authContext";
import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const { authStatus } = useAuth();

  // Auth verified: redirect appropriately
  return authStatus.authenticated ? (
    <Navigate to="/home/homepage" replace />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default RootRedirect;
