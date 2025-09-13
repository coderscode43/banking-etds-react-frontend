import "./main.css";
import App from "./App.jsx";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StaticDataState from "./context/StaticDataState";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <StaticDataState>
    <App />
  </StaticDataState>
  // </StrictMode>,
);
