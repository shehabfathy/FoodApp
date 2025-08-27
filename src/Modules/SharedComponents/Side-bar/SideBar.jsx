import React, { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/Images/sidebar.png";
import ChangePassword from "../../Authentication/Components/ChangePassword/ChangePassword";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../../Context/AuthContext";
export default function SideBar() {
  let { logOut, loginData } = useContext(AuthContext);
  let [isCollapse, setCollapse] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  let location = useLocation();
  let sidebar = () => {
    setCollapse(!isCollapse);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <i
            onClick={handleClose}
            className="fa-regular fa-circle-xmark fa-xl d-block ms-auto"
            style={{ color: "rgba(204,0,0,1)" }}
          ></i>
          <ChangePassword />
        </Modal.Body>
      </Modal>
      <div className="sidebar-container   ">
        <Sidebar collapsed={isCollapse} className="">
          <Menu>
            <div className={` ${isCollapse ? "w-100" : "w-75"}  `}>
              <img src={logo} onClick={() => sidebar()} alt="sidebar-img" />
            </div>
            <MenuItem
              icon={<i className="fa-solid fa-house"></i>}
              component={<Link to="/dashboard" />}
              active={location.pathname == "/dashboard"}
            >
              Home
            </MenuItem>
            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa-solid fa-users "></i>}
                component={<Link to="/dashboard/userList" />}
                active={location.pathname == "/dashboard/userList"}
              >
                Users
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem
              icon={<i className="fa-solid fa-table-cells-large"></i>}
              component={<Link to="/dashboard/recipeList" />}
              active={location.pathname == "/dashboard/recipeList"}
            >
              Recipes{" "}
            </MenuItem>
            <MenuItem
              icon={
                loginData?.userGroup == "SuperAdmin" ? (
                  <i className="fa-solid fa-calendar-days"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )
              }
              component={
                <Link
                  to={`/dashboard/${
                    loginData?.userGroup == "SuperAdmin"
                      ? "categoryList"
                      : "favorite"
                  }`}
                />
              }
              active={
                location.pathname ==
                `/dashboard/${
                  loginData?.userGroup == "SuperAdmin"
                    ? "categoryList"
                    : "favorite"
                }`
              }
            >
              {loginData?.userGroup == "SuperAdmin"
                ? "Categories"
                : "Favorites"}
            </MenuItem>
            <MenuItem
              onClick={() => handleShow()}
              icon={<i className="fa-solid fa-unlock"></i>}
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
    </>
  );
}
