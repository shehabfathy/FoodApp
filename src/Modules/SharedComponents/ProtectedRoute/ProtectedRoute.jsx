import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ data, children }) {
  console.log(data);
  if (data && localStorage.getItem("token") != null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
