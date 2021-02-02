import React from "react";
import { IoMenu } from "react-icons/io5";

function toggleMenu() {
  console.log("toggleMenu");
}

function Menu() {
  return (
    <div className="menu">
      <div
        id="menuIcon"
        onClick={function callToggleMenu() {
          toggleMenu();
        }}
      >
        <IoMenu></IoMenu>
      </div>
    </div>
  );
}

export default Menu;
