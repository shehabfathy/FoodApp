import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  let { loginData } = useContext(AuthContext);
  if (localStorage.getItem("token") != null || loginData) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
