import React from "react";
import logo from "../../../assets/Images/Group.png";
import style from "../../../assets/Images/Group 48101676.png";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();
  return (
    <section className="notfoundCover position-relative p-3">
      <div className="container-fluid">
        <div className="logo ">
          <img src={logo} alt="logo-img" />
        </div>
        <div className="content  position-absolute    ">
          <h5 className="fw-bolder fs-3">Oops.</h5>
          <p style={{ color: "#009247" }} className="fs-4">
            Page not found{" "}
          </p>
          <p className="item mb-4   ">
            This Page doesn’t exist or was removed! We suggest you back to home.
          </p>

          <button
            className="btn btn-success px-4 py-2"
            onClick={() => navigate("/dashboard")}
          >
            <i className="fa-solid fa-arrow-left"></i> Back To Home
          </button>
        </div>

        <div className="image position-absolute">
          <img src={style} alt="" />
        </div>
      </div>
    </section>
  );
}
