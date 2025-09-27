import "./main.css";
import App from "./App.jsx";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StaticDataProvider from "./context/StaticDataProvider";
import StatusProvider from "./context/StatusProvider";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <StatusProvider>
    <StaticDataProvider>
      <App />
    </StaticDataProvider>
  </StatusProvider>
  // </StrictMode>,
);
