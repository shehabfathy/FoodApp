import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ToastContainer limit={1} />
      <App />
    </AuthContextProvider>
  </StrictMode>
);
