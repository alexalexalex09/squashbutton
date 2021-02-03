import React from "react";

function MenuItem(props) {
  return (
    <li className="menuItem">
      <button onClick={props.onClick}>{props.children}</button>
    </li>
  );
}

export default MenuItem;
