import React from "react";
import GirlPhoto from "../../../assets/Images/header.png";
import { useLocation } from "react-router-dom";
export default function Header({ title, text, imgpath }) {
  let { pathname } = useLocation();

  return (
    <>
      <section className="container-fluid px-3 ">
        <div className="row demo   px-3  rounded-4">
          <div className="col-md-8 d-flex flex-column justify-content-center text-white">
            <h4>{title}</h4>
            <p className="w-75">{text}</p>
          </div>
          <div className="col-md-4 text-center  ">
            <img
              src={pathname === "/dashboard" ? GirlPhoto : imgpath}
              alt="header-img"
              className="img-fluid"
            />
          </div>
        </div>
      </section>
    </>
  );
}
