import "./main.css";
import App from "./App.jsx";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StaticDataProvider from "./context/StaticDataProvider";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <StaticDataProvider>
    <App />
  </StaticDataProvider>
  // </StrictMode>,
);
