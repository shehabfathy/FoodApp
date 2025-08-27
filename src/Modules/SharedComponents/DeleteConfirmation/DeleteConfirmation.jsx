import React from "react";
import NoDataImg from "../../../assets/Images/NoData.png";
export default function DeleteConfirmation({ deletedItem, isAdd }) {
  return (
    <>
      <div className="text-center ">
        <img src={NoDataImg} alt="NOData-Img" className="" />
        <h5>
          {isAdd ? "Add" : "Delete"} This {deletedItem}?
        </h5>
        <p className="text-muted">
          are you sure you want to {isAdd ? "Add" : "delete"} this item ? if you
          are sure just click on {isAdd ? "Add" : "delete"} it
        </p>
      </div>
    </>
  );
}
