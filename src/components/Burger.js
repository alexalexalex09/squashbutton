import React from "react";
import { bool, func } from "prop-types";

function Burger({ open, setOpen }) {
  return (
    <div
      open={open}
      onClick={() => setOpen(!open)}
      className={open ? "burger openMenu" : "burger closedMenu"}
    >
      <div className="burgerToppings"></div>
      <div className="burgerToppings"></div>
      <div className="burgerToppings"></div>
    </div>
  );
}

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;
