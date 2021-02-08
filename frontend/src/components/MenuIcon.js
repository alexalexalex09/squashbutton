import React, { useState, useContext } from "react";
import { Burger, Menu, MenuItem } from ".";
import { UserContext } from "../context/UserContext";

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

function MenuIcon() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="menuIconContainer">
      <Burger open={open} setOpen={setOpen}></Burger>
      <Menu open={open} setOpen={setOpen}>
        <li className="menuUser">
          {user == null ? (
            <a href="/auth/google">Sign in</a>
          ) : (
            "Welcome " + user
          )}
        </li>
        <MenuItem onClick={showColors}>Colors</MenuItem>
        <MenuItem onClick={toggleLightMode}>Light Mode</MenuItem>
        <MenuItem onClick={showTimeZone}>Time Zone</MenuItem>
        <MenuItem onClick={deleteAccountConfirm}>Delete Account</MenuItem>
        <li className="menuItem">
          <a href="/auth/logout">Sign Out</a>
        </li>
      </Menu>
    </div>
  );
}

export default MenuIcon;
