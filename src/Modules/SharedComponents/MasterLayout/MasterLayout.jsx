import React from "react";
import { Sidebar } from "react-pro-sidebar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../Side-bar/SideBar";

export default function MasterLayout({ logout }) {
  return (
    <>
      <div className="d-flex">
        <div className="w-25">
          <SideBar logOut={logout} />
        </div>
        <div className="w-100 ">
          <Navbar />
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}
