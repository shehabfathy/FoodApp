import React from "react";
import { Sidebar } from "react-pro-sidebar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../Side-bar/SideBar";

export default function MasterLayout({ logout, data }) {
  return (
    <>
      <div className="d-flex vh-100">
        <div className="">
          <SideBar logOut={logout} />
        </div>
        <div className="w-100 ">
          <Navbar Info={data} />
          <Outlet />
        </div>
      </div>
    </>
  );
}
