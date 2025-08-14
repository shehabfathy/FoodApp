import React, { useEffect, useState } from "react";
import header from "../../../assets/Images/eating a variety of foods-amico.svg";
import Header from "../../SharedComponents/Header/Header";
import axios from "axios";
import { toast } from "react-toastify";
import NoData from "../../SharedComponents/NoData/NoData";
import { BallTriangle } from "react-loader-spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../SharedComponents/DeleteConfirmation/DeleteConfirmation";
import { useForm } from "react-hook-form";

export default function CategoryList() {
  let [idItem, setIdItem] = useState(0);
  let [Category, setCategory] = useState([]);
  let [loading, setLoading] = useState(true);
  let [editId, setEditId] = useState(0);
  let [isAdd, setIsAdd] = useState(true);
  let {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setIdItem(id);
    setShow(true);
  };

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = (id, name) => {
    if (id && name) {
      setEditId(id);
      setShowAdd(true);
      setIsAdd(false);
      setValue("name", name);
    } else {
      setShowAdd(true);
      setIsAdd(true);
      setEditId(0);
      setValue("name", "");
    }
  };

  let getAllCategories = async () => {
    try {
      let { data } = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=5&pageNumber=1",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setCategory(data.data);

      setLoading(false);
    } catch (error) {
      toast(error.response.data.message);
      setLoading(false);
    }
  };

  let DeleteItem = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${idItem}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      handleClose();
      getAllCategories();

      setLoading(false);
    } catch (error) {
      toast(error.response.data.message);
      setLoading(false);
    }
  };

  let onSubmit = async (data) => {
    try {
      await axios[isAdd ? "post" : "put"](
        `https://upskilling-egypt.com:3006/api/v1/Category/${
          isAdd ? "" : editId
        }`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      handleCloseAdd();
      getAllCategories();
      {
        isAdd
          ? toast.success("Category add successfully")
          : toast.success("Category updated successfully");
      }
      setLoading(false);
    } catch (error) {
      toast(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

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
          <DeleteConfirmation deletedItem={"Category"} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="text-danger bg-transparent border-danger fw-bold"
            onClick={() => DeleteItem()}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header className="py-4 d-flex justify-content-between align-items-center">
          {<h5>{isAdd ? "Add Category" : "Update Category"}</h5>}
          <i
            onClick={handleCloseAdd}
            className="fa-regular fa-circle-xmark fa-xl ms-auto"
            style={{ color: "rgba(204,0,0,1)" }}
          ></i>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              className="form-control mb-3"
              placeholder="Category Name"
            />

            {errors.name && (
              <span className="text-danger mb-3">{errors.name.message}</span>
            )}

            <button className="btn btn-success d-block ms-auto ">
              {isAdd ? "Save" : "Update"}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Header
        title={"Categories Items"}
        text={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgpath={header}
      />

      <div className="title d-flex justify-content-between align-items-center p-3">
        <div className="description">
          <h5>Categories Table Details</h5>
          <p>You can check all details</p>
        </div>
        <div className="btns">
          <button
            onClick={() => {
              handleShowAdd();
            }}
            className="btn btn-success"
          >
            Add New Category
          </button>
        </div>
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
          {Category.length > 0 ? (
            <table className="table text-center ">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Creation Data</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Category.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.creationDate}</td>
                      <td>
                        <i
                          className="fa-solid fa-pen-to-square text-warning"
                          onClick={() => handleShowAdd(item.id, item.name)}
                        ></i>
                        <i
                          className="fa-solid fa-trash-can text-danger ps-3 "
                          onClick={() => handleShow(item.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      )}
    </>
  );
}
