import React, { useContext, useEffect, useState } from "react";
import header from "../../../assets/Images/eating a variety of foods-amico.svg";
import Header from "../../SharedComponents/Header/Header";
import GirlPhoto from "../../../assets/Images/header.png";
import NoDataImg from "../../../assets/Images/NoData.png";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../SharedComponents/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../SharedComponents/NoData/NoData";
import {
  axiosInstance,
  categoriesUrl,
  FavUrl,
  recipeUrl,
  TagUrl,
} from "../../../Services/Url";
import { AuthContext } from "../../../Context/AuthContext";
export default function RecipeList() {
  let { loginData } = useContext(AuthContext);
  let navigate = useNavigate();

  let [listId, setListId] = useState(null);
  let [Recipes, setRecipes] = useState([]);
  let [loading, setLoading] = useState(true);
  let [pageNum, setPageNum] = useState([]);
  const [activePage, setActivePage] = useState(1);
  let [idItem, setIdItem] = useState(0);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [selectedTag, setSelectedTag] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [Tags, setTags] = useState([]);
  const [Categories, setCategories] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setIdItem(id);
    setShow(true);
  };
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = (id) => {
    setIdItem(id);
    setShowAdd(true);
  };

  let addToFav = async (recipeId) => {
    try {
      let { data } = await axiosInstance.post(FavUrl.AddToFav, {
        recipeId: recipeId,
      });

      console.log(data);
      toast.success("item add to Favorite");
    } catch (error) {
      toast.error(error.response?.data?.message || "Faild to add to favorite");
    }
  };

  let getAllRecipes = async (
    pageSize,
    pageNumber,
    name,
    selectedTag,
    selectedCategory
  ) => {
    try {
      let { data } = await axiosInstance.get(recipeUrl.allRecipes, {
        params: {
          pageSize,
          pageNumber,
          name,
          tagId: selectedTag,
          categoryId: selectedCategory,
        },
      });
      setRecipes(data.data);
      toast.success(data.message || "show All Recipes");
      setPageNum([...Array(data.totalNumberOfPages)].map((_, i) => i + 1));
      setLoading(false);
    } catch (error) {
      toast.error(error.message || "Faild to Show Recipes");
      setLoading(false);
    }
  };

  let getAllTags = async () => {
    try {
      let { data } = await axiosInstance(TagUrl.getTags);
      setTags(data);
    } catch (error) {
      toast.error(error || "NO Tags Found");
    }
  };
  let getAllCategories = async () => {
    try {
      let { data } = await axiosInstance(categoriesUrl.allCategories);

      setCategories(data.data);
    } catch (error) {
      toast.error(error || "NO Tags Found");
    }
  };

  let deleteRecipe = async () => {
    try {
      await axiosInstance.delete(recipeUrl.deleteRecipe(idItem));
      handleClose();
      await getAllRecipes(3, activePage, name, selectedTag, selectedCategory);
      toast.success("Recipe deleted successfully");
      setLoading(false);
    } catch (error) {
      toast(error.response.data.message || "Faild to delete Recipe");
      setLoading(false);
    }
  };

  let handleFilter = (e) => {
    setName(e.target.value);
    setActivePage(1);
  };
  let handleTagFilter = (e) => {
    setSelectedTag(e.target.value);
  };
  let handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
  };
  useEffect(() => {
    getAllRecipes(3, activePage, name, selectedTag, selectedCategory);
  }, [activePage, name, selectedTag, selectedCategory]);
  useEffect(() => {
    getAllTags();
    getAllCategories();
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
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deletedItem={"Recipe"} isAdd={true} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              addToFav(idItem);
              handleCloseAdd();
            }}
          >
            Add To Favorite
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div className="title d-flex justify-content-between align-items-center p-3">
          <div className="description">
            <h5>Recipe Table Details</h5>
            <p>You can check all details</p>
          </div>
          <div className="btns">
            {loginData?.userGroup == "SuperAdmin" ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  setLoading(true);
                  navigate("/dashboard/recipeData");
                  setLoading(false);
                }}
              >
                {loading ? (
                  <i
                    className="fa-solid fa
                  -spinner"
                  ></i>
                ) : (
                  <>Add New Item</>
                )}
              </button>
            ) : (
              ""
            )}
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
                <button
                  type="button"
                  aria-label="Delete Item"
                  onClick={handleClose}
                  className="fa-regular fa-circle-xmark fa-xl ms-auto bg-transparent border-0"
                  style={{ color: "rgba(204,0,0,1)" }}
                ></button>
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
              <>
                <div className=" mb-2  d-flex justify-content-between align-items-center w-100">
                  <div className="position-relative w-50  ">
                    <i className="fa-solid fa-magnifying-glass position-absolute icon-input"></i>
                    <input
                      className="  px-4 py-1 w-100 border-1 border-light-subtle table-input"
                      type="text"
                      placeholder="Search by name... "
                      onChange={handleFilter}
                    />
                  </div>
                  <div>
                    <div>
                      <select
                        onChange={handleTagFilter}
                        value={selectedTag}
                        className="  px-4 py-1 me-3  border-1 border-light-subtle"
                      >
                        <option value={0}>All Tags</option>
                        {Tags?.map((tag) => (
                          <option key={tag.id} value={tag.id}>
                            {tag.name}
                          </option>
                        ))}
                      </select>

                      <select
                        onChange={handleCategoryFilter}
                        value={selectedCategory}
                        className="  px-4 py-1 border-1 border-light-subtle"
                      >
                        <option value={0}> All Categories</option>
                        {Categories?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="table-x">
                  <table className="table  text-center ">
                    <thead>
                      <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">tag</th>
                        <th scope="col">Category</th>
                        <th scope="col">
                          {loginData?.userGroup == "SuperAdmin"
                            ? "Action"
                            : "Add to Favorite"}
                        </th>
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
                              {loginData?.userGroup == "SuperAdmin" ? (
                                <div className=" listIcon">
                                  <button
                                    type="button"
                                    style={{ cursor: "pointer" }}
                                    className="fa-solid fa-ellipsis bg-transparent border-0 "
                                    onClick={() => {
                                      setListId(
                                        listId === item.id ? null : item.id
                                      );
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
                                              categoriesIds:
                                                item.category[0]?.id,
                                              recipeImage: `https://upskilling-egypt.com:3006/${item.imagePath}`,
                                            };
                                            navigate("/dashboard/recipeData", {
                                              state: { isUpdate, EditData },
                                            });
                                          }}
                                        >
                                          <i
                                            className="fa-solid fa-pen-to-square text-warning  bg-transparent border-0 "
                                            style={{ cursor: "pointer" }}
                                          ></i>
                                          <span>Edit</span>
                                        </li>
                                        <li
                                          className="d-flex align-align-items-center "
                                          onClick={() => handleShow(item.id)}
                                        >
                                          <i
                                            className="fa-solid fa-trash-can text-danger bg-transparent border-0   "
                                            style={{ cursor: "pointer" }}
                                          ></i>
                                          <span>Delete</span>
                                        </li>
                                      </ul>
                                    )}
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  aria-label="Add To Favorite"
                                  className="fa-solid fa-heart text-danger bg-transparent border-0"
                                  onClick={() => handleShowAdd(item.id)}
                                ></button>
                              )}
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
                              setLoading(true);
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
                              page === activePage - 1 ||
                              page === activePage ||
                              page === activePage + 1
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
                                if (page != activePage) {
                                  setActivePage(page);
                                  setLoading(true);
                                }
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
                            setLoading(true);
                          }}
                          aria-label="Next"
                        >
                          <span aria-hidden="true">»</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            ) : (
              <NoData />
            )}
          </div>
        )}
      </div>
    </>
  );
}
