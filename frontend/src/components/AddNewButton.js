import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { FiPlus } from "react-icons/fi";

function AddNewButton(props) {
  const { user } = useContext(UserContext);
  const formRef = useRef(null);
  const [newButton, setNewButton] = useState("New Button");

  function toggleAddDialog() {
    formRef.current.classList.toggle("showInput");
    formRef.current.querySelector("input[type='text']").select();
  }

  function createButton(event) {
    event.preventDefault();
    event.stopPropagation();
    const body = JSON.stringify({ user: user, title: newButton });
    fetch("/api/buttons/create", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((res) => {
        console.log(res);
        if (res) {
          console.log(res.button);
          toggleAddDialog();
          props.createFunction();
        } else {
          console.error("No button created");
        }
      });
    });
  }

  return (
    <div ref={formRef} className="addNewButton">
      <div className="plus" onClick={toggleAddDialog}>
        <FiPlus></FiPlus>
      </div>
      <div className="addNewButtonTitle">Add New Button</div>
      <form className="addDialog" onSubmit={(e) => createButton(e)}>
        <input
          className="noFocus"
          type="text"
          value={newButton}
          onChange={(e) => setNewButton(e.target.value)}
        ></input>
        <input type="submit" value="✓"></input>
      </form>
    </div>
  );
}

export default AddNewButton;
