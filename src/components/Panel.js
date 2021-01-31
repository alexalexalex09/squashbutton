import React from "react";

import { AddNewButton, ButtonPlaceHolder /*, Button*/ } from "./";

function Panel() {
  return (
    <div className="panel">
      <AddNewButton></AddNewButton>
      <ButtonPlaceHolder></ButtonPlaceHolder>
      {/*Get user buttons, then replace ButtonPlaceHolder with the user's buttons*/}
    </div>
  );
}

export default Panel;
