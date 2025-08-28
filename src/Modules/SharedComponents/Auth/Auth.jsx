import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../../assets/Images/44.svg";
export default function Auth() {
  return (
    <>
      <section className="auth-container vh-100 d-flex justify-content-center align-items-center">
        <div className="container-fluid ">
          <div className="row   ">
            <div className="col-md-6 mx-auto ">
              <div className="bg-white px-5 py-4 rounded-3 ">
                <div className="logo text-center mb-3">
                  {" "}
                  <img className="w-50" src={logo} alt="login logo" />
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
