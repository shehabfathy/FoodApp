import React from "react";
import logo from "../../../assets/Images/me.jpg";

export default function Navbar({ Info }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2 m-2 rounded-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Food App
          </a>

          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Collapse */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item d-flex justify-content-center align-items-center">
                <img
                  className="rounded-circle "
                  style={{ width: "50px" }}
                  src={logo}
                  alt="user-photo"
                />
                <a className="nav-link active" aria-current="page" href="#">
                  {Info ? Info.userName : "Default User"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
