import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { authenticationStatus } from "@/service/apiService";
import Loader from "@/components/component/Loader";

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState({
    status: "inactive",
    authenticated: false,
    loading: true,
  });
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const response = await authenticationStatus();
        setAuthStatus({ ...response.data, loading: false });
      } catch (error) {
        console.error("Error fetching auth status", error);
        setAuthStatus({ ...error?.response?.data, loading: false });
      }
    };
    getAuthStatus();
  }, []);

  useEffect(() => {
    // Add a small delay before rendering anything
    const timer = setTimeout(() => setDelayed(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Step 1: If still delaying, show nothing or loader
  if (delayed) return <Loader loading />;

  if (authStatus.loading) {
    return <Loader loading={authStatus?.loading} />;
  }

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
