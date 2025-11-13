import "./main.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthProvider";
import StaticDataProvider from "./context/StaticDataProvider";
import StatusProvider from "./context/StatusProvider";
import "@fortawesome/fontawesome-free/css/all.min.css";
// Environment variable for login with SSOAuthServer
import { loginWithSSO } from "./config/env";

createRoot(document.getElementById("root")).render(
  loginWithSSO ? (
    <StaticDataProvider>
      <StatusProvider>
        <App />
        <Toaster richColors position="top-right" />
      </StatusProvider>
    </StaticDataProvider>
  ) : (
    <AuthProvider>
      <StaticDataProvider>
        <StatusProvider>
          <App />
          <Toaster richColors position="top-right" />
        </StatusProvider>
      </StaticDataProvider>
    </AuthProvider>
  )
);
