import React from "react";
import logo from "../../../assets/Images/me.jpg";
export default function Navbar({ Info }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2 m-2 rounded-4 ">
        <div className="container-fluid d-flex align-items-center ">
          <div className="logo">
            <a className="navbar-brand" href="#">
              Food App
            </a>
          </div>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex justify-content-center align-self-start">
                <div className="image">
                  <img
                    className="rounded-circle"
                    style={{ width: "50px" }}
                    src={logo}
                    alt="user-photo"
                  />
                </div>

                <a className="nav-link active" aria-current="page" href="#">
                  {Info ? Info.userName : "default User"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
