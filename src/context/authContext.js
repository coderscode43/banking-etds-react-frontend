import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Safe fallback when provider is not rendered
    return { setAuthStatus: () => {} };
  }
  return context;
};
