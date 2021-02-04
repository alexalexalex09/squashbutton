import React from "react";
import { IoMenu } from "react-icons/io5";
import Menu from "./Menu";

function toggleMenu() {
  var el = document.querySelector("#menu");
  if (el.classList.contains("off")) {
    el.classList.remove("off");
    setTimeout(() => {
      el.classList.remove("left");
    }, 1);
  } else {
    el.classList.add("left");
    setTimeout(() => {
      el.classList.add("off");
    }, 1000);
  }
}

function MenuIcon() {
  return (
    <div className="menuIconContainer">
      <div
        id="menuIcon"
        onClick={function callToggleMenu() {
          toggleMenu();
        }}
      >
        <IoMenu></IoMenu>
      </div>
      <Menu></Menu>
    </div>
  );
}

export default MenuIcon;
