import React, { useContext } from "react";
import { Sidebar } from "react-pro-sidebar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../Side-bar/SideBar";
import { AuthContext } from "../../../Context/AuthContext";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex vh-100 overflow-hidden">
        <div className="">
          <SideBar />
        </div>
        <div className="w-100 d-flex flex-column  ">
          <div className=" overflow-auto  container-fluid">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
