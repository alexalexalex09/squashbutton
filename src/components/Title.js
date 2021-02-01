import React from "react";
import { Menu } from "./";

function Title() {
  return (
    <div className="title">
      <Menu></Menu>
      <h1 className="titleText">SquashButton</h1>
      <div className="logo">
        <img
          alt="Squash Logo"
          src="/img/logo.svg"
          id="logoImg"
          width="64"
          height="64"
        ></img>
      </div>
    </div>
  );
}

export default Title;
