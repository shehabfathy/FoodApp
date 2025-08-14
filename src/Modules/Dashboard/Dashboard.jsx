import React from "react";
import Header from "../SharedComponents/Header/Header";
import { useNavigate } from "react-router-dom";
export default function Dashboard({ data }) {
  let navigate = useNavigate();
  return (
    <>
      <Header
        title={`Welcome ${data?.userName}`}
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
              Fill the <span className="text-success">Recipes </span> !{" "}
            </h5>
            <p className="w-75">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div className="btns">
            <button
              className="btn btn-success "
              onClick={() => navigate("/dashboard/recipeList")}
            >
              Fill Recipes <i className="fa-solid fa-arrow-right ps-2"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
