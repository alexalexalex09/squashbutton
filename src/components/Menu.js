import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import MenuItem from "./MenuItem";

const closeMenu = function () {
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
};

function showColors() {
  console.log("showColors");
}

function toggleLightMode() {
  console.log("toggleLightMode");
}

function showTimeZone() {
  console.log("showTimeZone");
}

function deleteAccountConfirm() {
  console.log("deleteAccountConfirm");
}

function signOut() {
  console.log("signOut");
}

function Menu() {
  return (
    <div id="menu" className="off left">
      <div id="menuContainer" className="container">
        <button className="closeButton" onClick={closeMenu}>
          <IoCloseCircleOutline></IoCloseCircleOutline>
        </button>
        <MenuItem
          onClick={function callShowColors() {
            showColors();
          }}
        >
          Colors
        </MenuItem>
        <MenuItem onClick={toggleLightMode}>Light Mode</MenuItem>
        <MenuItem onClick={showTimeZone}>Time Zone</MenuItem>
        <MenuItem onClick={deleteAccountConfirm}>Delete Account</MenuItem>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </div>
    </div>
  );
}

export default Menu;
