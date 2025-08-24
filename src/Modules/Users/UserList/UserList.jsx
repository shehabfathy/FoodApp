import React, { useEffect, useState } from "react";
import Header from "../../SharedComponents/Header/Header";
import header from "../../../assets/Images/eating a variety of foods-amico.svg";
import NoData from "../../SharedComponents/NoData/NoData";
import GirlPhoto from "../../../assets/Images/header.png";
import { axiosInstance, imgURL, userUrl } from "../../../Services/Url";
import { BallTriangle } from "react-loader-spinner";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../SharedComponents/DeleteConfirmation/DeleteConfirmation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function UserList() {
  let [userList, setUserList] = useState([]);
  let [loading, setLoading] = useState(true);
  let [idItem, setIdItem] = useState(0);
  const [name, setName] = useState("");
  let [pageNum, setPageNum] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setIdItem(id);
    setShow(true);
  };
  let getAllUsers = async (pageSize, pageNumber, name) => {
    try {
      let { data } = await axiosInstance(userUrl.getUsers, {
        params: { pageSize, pageNumber, userName: name },
      });
      setUserList(data.data);

      setPageNum([...Array(data.totalNumberOfPages)].map((_, i) => i + 1));
      toast.success(data.message || "get All Users");
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  let deleteUser = async () => {
    try {
      let { data } = await axiosInstance.delete(userUrl.deleteUser(idItem));
      handleClose();
      getAllUsers(4, activePage, name);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  let handleFilter = (e) => {
    setName(e.target.value);
    setActivePage(1);
  };

  useEffect(() => {
    getAllUsers(4, activePage, name);
  }, [activePage, name]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="py-4">
          <i
            onClick={handleClose}
            className="fa-regular fa-circle-xmark fa-xl ms-auto"
            style={{ color: "rgba(204,0,0,1)" }}
          ></i>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deletedItem={"User"} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="text-danger bg-transparent border-danger fw-bold"
            onClick={() => deleteUser()}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      <Header
        title={"Users List"}
        text={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgpath={header}
      />
      <div className="p-3">
        <h6 className="mb-0">Users Table Details</h6>
        <p>You can check all details</p>
      </div>
      {loading ? (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div className="p-3">
          {userList.length > 0 ? (
            <>
              <div className="position-relative mb-2">
                <i className="fa-solid fa-magnifying-glass position-absolute icon-input"></i>
                <input
                  className="  form-control px-4"
                  type="text"
                  placeholder="Search by name... "
                  onChange={handleFilter}
                />
              </div>
              <table className="table text-center ">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Email</th>
                    <th scope="col">Country</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.userName}</td>
                        <td>
                          <img
                            className="table-img "
                            src={
                              item.imagePath
                                ? `${imgURL}${item.imagePath}`
                                : GirlPhoto
                            }
                            alt="user-image"
                          />
                        </td>
                        <td>{item.email}</td>
                        <td>{item.country}</td>
                        <td>
                          <i
                            className="fa-solid fa-trash-can text-danger  "
                            onClick={() => handleShow(item.id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <nav aria-label="Page navigation example ">
                <ul className="pagination d-flex justify-content-center ">
                  <li className="page-item">
                    <a
                      className={`page-link ${
                        activePage > 1 ? "" : "disabled"
                      }`}
                      onClick={() => {
                        if (activePage >= 1) {
                          setActivePage(activePage - 1);
                        }
                      }}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  {pageNum
                    .filter((page) => {
                      if (activePage == pageNum.length) {
                        return (
                          page == activePage ||
                          page == activePage - 1 ||
                          page == activePage - 2
                        );
                      } else {
                        return (
                          page == activePage - 1 ||
                          page == activePage ||
                          page == activePage + 1
                        );
                      }
                    })

                    .map((page, i) => (
                      <li key={i} className="page-item">
                        <a
                          className={`page-link ${
                            page === activePage ? "active" : ""
                          } `}
                          onClick={() => {
                            setActivePage(page);
                          }}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                  <li className="page-item">
                    <a
                      className={`page-link ${
                        activePage == pageNum.length ? "disabled" : ""
                      }`}
                      onClick={() => {
                        setActivePage(activePage + 1);
                      }}
                      aria-label="Next"
                    >
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <NoData />
          )}
        </div>
      )}
    </>
  );
}
