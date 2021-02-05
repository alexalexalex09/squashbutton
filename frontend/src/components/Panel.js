import React from "react";

import { AddNewButton, ButtonPlaceHolder /*, SquashButton*/ } from ".";

function Panel() {
  return (
    <div className="panel">
      <AddNewButton></AddNewButton>
      <ButtonPlaceHolder></ButtonPlaceHolder>
      {/*Get user buttons, then replace ButtonPlaceHolder with the user's SquashButtons*/}
    </div>
  );
}

export default Panel;
