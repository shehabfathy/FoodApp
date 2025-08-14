import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from "./Modules/SharedComponents/Auth/Auth";
import Login from "./Modules/Authentication/Components/Login/Login";
import Register from "./Modules/Authentication/Components/Register/Register";
import ResetPass from "./Modules/Authentication/Components/Reset-Pass/ResetPass";
import ForgetPass from "./Modules/Authentication/Components/Forget-Pass/ForgetPass";
import VerifyAccount from "./Modules/Authentication/Components/Verfiy-Acc/VerifyAccount";
import NotFound from "./Modules/SharedComponents/NotFound/NotFound";
import MasterLayout from "./Modules/SharedComponents/MasterLayout/MasterLayout";
import RecipeList from "./Modules/Recipe/RecipeList/RecipeList";
import CategoryList from "./Modules/Category/CategoryList/CategoryList";
import FavoriteList from "./Modules/Favorite/FavoriteList/FavoriteList";
import Dashboard from "./Modules/Dashboard/Dashboard";
import RecipeData from "./Modules/Recipe/RecipeData/RecipeData";
import CategoryData from "./Modules/Category/CategoryData/CategoryData";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./Modules/SharedComponents/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import ChangePassword from "./Modules/Authentication/Components/ChangePassword/ChangePassword";
import UserList from "./Modules/Users/UserList/UserList";

function App() {
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

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Auth />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Login getuser={getUser} /> },
        { path: "login", element: <Login getuser={getUser} /> },
        { path: "register", element: <Register /> },
        { path: "resetPass", element: <ResetPass /> },
        { path: "forgetPass", element: <ForgetPass /> },
        { path: "verifyAccount", element: <VerifyAccount /> },
        { path: "changepassword", element: <ChangePassword /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute data={loginData}>
          <MasterLayout logout={logOut} data={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Dashboard data={loginData} /> },
        { path: "recipeList", element: <RecipeList /> },
        { path: "recipeData", element: <RecipeData /> },
        { path: "categoryData", element: <CategoryData /> },
        { path: "categoryList", element: <CategoryList /> },
        { path: "userList", element: <UserList /> },
        { path: "favorite", element: <FavoriteList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  );
}
export default App;
