import React, { useState } from "react";
import { Burger, Menu, MenuItem } from "./";

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

function MenuIcon() {
  const [open, setOpen] = useState(false);
  return (
    <div className="menuIconContainer">
      <Burger open={open} setOpen={setOpen}></Burger>
      <Menu open={open} setOpen={setOpen}>
        <MenuItem onClick={showColors}>Colors</MenuItem>
        <MenuItem onClick={toggleLightMode}>Light Mode</MenuItem>
        <MenuItem onClick={showTimeZone}>Time Zone</MenuItem>
        <MenuItem onClick={deleteAccountConfirm}>Delete Account</MenuItem>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
}

export default MenuIcon;
