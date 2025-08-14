import React from "react";
import NoDataImg from "../../../assets/Images/NoData.png";
export default function NoData() {
  return (
    <>
      <div className="text-center ">
        <img src={NoDataImg} alt="NOData-Img" className="" />
        <h5>No Data !</h5>
        <p className="text-muted">
          {" "}
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </p>
      </div>
    </>
  );
}
