import React, { useEffect, useState } from "react";
import header from "../../../assets/Images/eating a variety of foods-amico.svg";
import Header from "../../SharedComponents/Header/Header";
import GirlPhoto from "../../../assets/Images/header.png";
import NoDataImg from "../../../assets/Images/NoData.png";
import { toast } from "react-toastify";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../SharedComponents/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../SharedComponents/NoData/NoData";
export default function RecipeList() {
  let navigate = useNavigate();
  let [listId, setListId] = useState(null);
  let [Recipes, setRecipes] = useState([]);
  let [loading, setLoading] = useState(true);
  let [idItem, setIdItem] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setIdItem(id);
    setShow(true);
  };

  let getAllRecipes = async () => {
    try {
      let { data } = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setRecipes(data.data);
      setLoading(false);
    } catch (error) {
      toast(error.response.data.message);
      setLoading(false);
    }
  };

  let deleteRecipe = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${idItem}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      handleClose();
      getAllRecipes();
      setLoading(false);
    } catch (error) {
      toast(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <Header
        title={"Recipes Items"}
        text={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgpath={header}
      />
      <div className="title d-flex justify-content-between align-items-center p-3">
        <div className="description">
          <h5>Recipe Table Details</h5>
          <p>You can check all details</p>
        </div>
        <div className="btns">
          <button
            className="btn btn-success"
            onClick={() => {
              setLoading(true);
              navigate("/dashboard/recipeData");
              setLoading(false);
            }}
          >
            {loading ? (
              <i className="fa-solid fa-spinner"></i>
            ) : (
              <>Add New Item</>
            )}
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="py-4">
              <i
                onClick={handleClose}
                className="fa-regular fa-circle-xmark fa-xl ms-auto"
                style={{ color: "rgba(204,0,0,1)" }}
              ></i>
            </Modal.Header>
            <Modal.Body>
              <DeleteConfirmation deletedItem={"Recipe"} />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="text-danger bg-transparent border-danger fw-bold"
                onClick={() => deleteRecipe()}
              >
                Delete this item
              </Button>
            </Modal.Footer>
          </Modal>
          {Recipes.length > 0 ? (
            <table className="table text-center ">
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">tag</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Recipes.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td scope="row">{item.name}</td>
                      <td>
                        {item.imagePath == "" ? (
                          <img
                            className="table-img"
                            src={GirlPhoto}
                            alt="food-img"
                          />
                        ) : (
                          <img
                            className="table-img"
                            src={`https://upskilling-egypt.com:3006/${item.imagePath}`}
                            alt="Food-img"
                          />
                        )}
                      </td>
                      <td>{item.price} EGP</td>
                      <td>{item.description}</td>
                      <td>{item.tag.name}</td>
                      <td>{item.category[0]?.name}</td>
                      <td>
                        <div className=" listIcon">
                          <i
                            className="fa-solid fa-ellipsis "
                            onClick={() => {
                              setListId(listId === item.id ? null : item.id);
                            }}
                          >
                            {listId === item.id && (
                              <ul className=" p-2   shadow-sm ">
                                <li
                                  className="mb-2 "
                                  onClick={() => {
                                    let isUpdate = true;
                                    let EditData = {
                                      name: item.name,
                                      price: item.price,
                                      id: item.id,
                                      tagId: item.tag.id,
                                      categoriesIds: item.category[0]?.id,
                                      recipeImage: `https://upskilling-egypt.com:3006/${item.imagePath}`,
                                    };
                                    navigate("/dashboard/recipeData", {
                                      state: { isUpdate, EditData },
                                    });
                                  }}
                                >
                                  <i className="fa-solid fa-pen-to-square text-warning  "></i>
                                  <span>Edit</span>
                                </li>
                                <li
                                  className="d-flex align-align-items-center "
                                  onClick={() => handleShow(item.id)}
                                >
                                  <i className="fa-solid fa-trash-can text-danger  "></i>
                                  <span>Delete</span>
                                </li>
                              </ul>
                            )}
                          </i>
                        </div>
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
