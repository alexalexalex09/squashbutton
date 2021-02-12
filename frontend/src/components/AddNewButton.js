import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { FiPlus } from "react-icons/fi";

function AddNewButton() {
  const { user } = useContext(UserContext);
  const formRef = useRef(null);
  const [newButton, setNewButton] = useState("New Button");

  function toggleAddDialog() {
    formRef.current.classList.toggle("showInput");
    formRef.current.querySelector("input[type='text']").select();
  }

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
    return false;
  }

  return (
    <div ref={formRef} className="addNewButton">
      <div className="plus" onClick={toggleAddDialog}>
        <FiPlus></FiPlus>
      </div>
      <div className="addNewButtonTitle">Add New Button</div>
      <form className="addDialog" onSubmit={createButton}>
        <input
          className="noFocus"
          type="text"
          value={newButton}
          onChange={(e) => setNewButton(e.target.value)}
        ></input>
        <input type="submit" value="Add"></input>
      </form>
    </div>
  );
}

export default AddNewButton;
