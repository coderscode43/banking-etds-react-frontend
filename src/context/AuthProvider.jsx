import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { authenticationStatus } from "@/service/apiService";
import Loader from "@/components/component/Loader";

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState({
    status: "inactive",
    authenticated: false,
  });
  const [delayed, setDelayed] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        setLoading(true);
        const response = await authenticationStatus();
        setAuthStatus(response?.data);
      } catch (error) {
        console.error("Error fetching auth status", error);
        setAuthStatus(error?.response?.data);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
