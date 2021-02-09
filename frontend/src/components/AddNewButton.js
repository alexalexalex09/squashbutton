import React from "react";
import { FiPlus } from "react-icons/fi";

function AddNewButton() {
  return (
    <div className="addNewButton">
      <div className="plus">
        <FiPlus></FiPlus>
      </div>
      <div className="addNewButtonTitle">Add New Button</div>
    </div>
  );
}

export default AddNewButton;
