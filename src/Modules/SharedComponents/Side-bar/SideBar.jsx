import React from "react";

export default function SideBar({ logOut }) {
  return (
    <>
      <button onClick={() => logOut()}>LogOut</button>
    </>
  );
}
