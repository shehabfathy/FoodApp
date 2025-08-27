import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);

export function AuthContextProvider(props) {
  let [loginData, setLoginData] = useState(null);

  let getUser = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  };

  let logOut = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to="/login" />;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ loginData, getUser, setLoginData, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
