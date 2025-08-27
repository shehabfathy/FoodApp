import React, { useEffect, useState } from "react";
import Header from "../../SharedComponents/Header/Header";
import header from "../../../assets/Images/eating a variety of foods-amico.svg";
import { axiosInstance, FavUrl, imgURL } from "../../../Services/Url";
import NoData from "../../SharedComponents/NoData/NoData";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NoDataImg from "../../../assets/Images/NoData.png";
import DeleteConfirmation from "../../SharedComponents/DeleteConfirmation/DeleteConfirmation";
import { BallTriangle } from "react-loader-spinner";

export default function FavoriteList() {
  const [FavoritesItems, setFavoritesItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemId, setID] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setID(id);
  };

  const getAllFav = async () => {
    try {
      const { data } = await axiosInstance.get(FavUrl.getAllFav);
      setFavoritesItems(data.data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFav = async (id) => {
    try {
      await axiosInstance.delete(FavUrl.deleteFav(id));
      toast.success("item remove from List");
      getAllFav();
    } catch (error) {
      console.error("Failed to delete favorite:", error);
    }
  };

  useEffect(() => {
    getAllFav();
  }, []);

  return (
    <>
      <Header
        title="Favorite Items!"
        text="You can now add your items that any user can order it from the Application and you can edit"
        imgpath={header}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deletedItem={"Recipe"} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteFav(itemId);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <section className="p-3">
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
        ) : FavoritesItems.length === 0 ? (
          <NoData />
        ) : (
          <div className="row g-3">
            {FavoritesItems.map((item) => (
              <div key={item.id} className="col-md-4">
                <div className="card shadow">
                  <div className="image  overflow-hidden">
                    <img
                      className="w-100"
                      src={`${imgURL}${item.recipe?.imagePath}`}
                      alt={item.recipe.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="card-body position-relative ">
                    <h4 className="">
                      {item.recipe.name}
                      <button
                        type="button"
                        onClick={() => handleShow(item.id)}
                        className="fa-solid fa-trash-can position-absolute text-danger bg-transparent border-0"
                        style={{
                          top: "20px",
                          right: "10px",
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                      ></button>
                    </h4>
                    <p>{item.recipe.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
