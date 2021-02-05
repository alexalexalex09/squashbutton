import React from "react";
import { bool } from "prop-types";

function Menu({ open, children }) {
  return (
    <div id="menu" open={open} className={open ? "" : "left"}>
      <div id="menuContainer" className="container">
        {children}
      </div>
    </div>
  );
}

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
