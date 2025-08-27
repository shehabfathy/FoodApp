import React, { useContext, useState } from "react";
import Header from "../SharedComponents/Header/Header";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
export default function Dashboard() {
  let { loginData } = useContext(AuthContext);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  return (
    <>
      <Header
        title={`Welcome ${loginData?.userName}`}
        text={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <section className="container-fluid">
        <div
          className="title d-flex justify-content-between align-items-center p-4 my-2"
          style={{ backgroundColor: "rgba(240, 255, 239, 1)" }}
        >
          <div className="description">
            <h5>
              {loginData?.userGroup == "SuperAdmin" ? "Fill the" : "Show the "}
              <span className="text-success">Recipes </span> !{" "}
            </h5>
            <p className="w-75">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div className="btns">
            <button
              className="btn btn-success   "
              onClick={() => {
                setLoading(true);
                navigate("/dashboard/recipeList");
              }}
            >
              {loading ? (
                <i className="fa-solid fa-spinner"></i>
              ) : (
                <>
                  {loginData?.userGroup == "SuperAdmin" ? "Fill" : ""} Recipes
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-arrow-right bg-transparent border-0 text-white ps-1  "
                    type="button"
                    aria-label="view All Recipes"
                  ></i>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
