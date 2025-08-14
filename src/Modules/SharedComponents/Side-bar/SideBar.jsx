import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../assets/Images/sidebar.png";
export default function SideBar({ logOut }) {
  let [isCollapse, setCollapse] = useState(false);

  let sidebar = () => {
    setCollapse(!isCollapse);
  };
  return (
    <>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapse}>
          <Menu>
            <img
              src={logo}
              onClick={() => sidebar()}
              alt="sidebar-img"
              className="py-4"
            />

            <MenuItem
              icon={<i className="fa-solid fa-house"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-users "></i>}
              component={<Link to="/dashboard/userList" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-table-cells-large"></i>}
              component={<Link to="/dashboard/recipeList" />}
            >
              Recipes{" "}
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-calendar-days"></i>}
              component={<Link to="/dashboard/categoryList" />}
            >
              Categories{" "}
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-unlock"></i>}
              component={<Link to="/changepassword" />}
            >
              Change Password{" "}
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              onClick={() => logOut()}
            >
              LogOut
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      ;
    </>
  );
}
