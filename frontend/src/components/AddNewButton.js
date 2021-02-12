import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FiPlus } from "react-icons/fi";

function AddNewButton() {
  const { user } = useContext(UserContext);
  function createButton() {
    const body = JSON.stringify({ user: user });
    fetch("/api/buttons/create", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((res) => {
        if (res.buttons) {
          console.log(res.buttons);
        } else {
          console.error("No button created");
        }
      });
    });
  }
  return (
    <div className="addNewButton">
      <div className="plus" onClick={createButton}>
        <FiPlus></FiPlus>
      </div>
      <div className="addNewButtonTitle">Add New Button</div>
    </div>
  );
}

export default AddNewButton;
