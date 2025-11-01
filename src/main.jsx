import "./main.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthProvider";
import StaticDataProvider from "./context/StaticDataProvider";
import StatusProvider from "./context/StatusProvider";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <StaticDataProvider>
      <StatusProvider>
        <App />
        <Toaster richColors position="top-right" />
      </StatusProvider>
    </StaticDataProvider>
  </AuthProvider>
  // </StrictMode>,
);
