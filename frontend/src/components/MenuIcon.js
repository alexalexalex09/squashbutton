import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { Burger, Menu, MenuItem, Dialog } from ".";
import { UserContext } from "../context/UserContext";

function MenuIcon() {
  const [open, setOpen] = useState(false);
  const [timeZone, setTimeZone] = useState("UTC");
  const { user } = useContext(UserContext);
  const timeZoneConfirm = useRef(null);
  const shadow = useRef(null);

  function showColors() {
    console.log("showColors");
  }

  function toggleLightMode() {
    console.log("toggleLightMode");
  }

  function toggleTimeZoneConfirm() {
    console.log("showTimeZone");
  }

  function changeTimeZone() {
    const fetchTimeZone = async () => {
      const data = {
        timeZone: timeZone,
      };
      const response = await axios({
        url: "/api/user_set_prefs",
        method: "POST",
        data: data,
      });
      if (response.data) {
        console.log(response.data);
      } else {
        console.error("Time Zone not changed");
      }
    };
    fetchTimeZone();
  }

  function deleteAccountConfirm() {
    console.log("deleteAccountConfirm");
  }

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
        <MenuItem onClick={toggleTimeZoneConfirm}>Time Zone</MenuItem>
        <MenuItem onClick={deleteAccountConfirm}>Delete Account</MenuItem>
        <div className="confirmContainer off" ref={timeZoneConfirm}>
          <div className="shadow" ref={shadow}>
            <Dialog
              confirmCancel={() => toggleTimeZoneConfirm(timeZoneConfirm)}
              confirmAction={() => changeTimeZone()}
              value={timeZone}
              setValue={setTimeZone}
              noClass="redButton"
              yesClass="greenButton"
              type="timeZone"
              fullTitle="Select a Time Zone"
              yesText="Select"
            ></Dialog>
          </div>
        </div>
        <li className="menuItem">
          <a href="/auth/logout">Sign Out</a>
        </li>
      </Menu>
    </div>
  );
}

export default MenuIcon;
