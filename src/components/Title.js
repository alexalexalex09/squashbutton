import React from "react";
import { MenuIcon } from "./";

function Title() {
  return (
    <div className="title">
      <MenuIcon></MenuIcon>
      <h1 className="titleText">SquashButton</h1>
      <div className="logo">
        <a href="/">
          <img
            alt="Squash Logo"
            src="/img/logo.svg"
            id="logoImg"
            width="64"
            height="64"
          ></img>
        </a>
      </div>
    </div>
  );
}

export default Title;
