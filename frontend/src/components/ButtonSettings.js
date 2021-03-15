import React, { useRef, useEffect, useState } from "react";
import { Confirm } from "../components";
import axios from "axios";
import { FiSettings, FiX, FiEdit } from "react-icons/fi";

function useOutsideAlerter(ref, hide) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        window.getComputedStyle(ref.current).display !== "none" &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        hide.current.classList.add("off");
      }
    }

    function getEscapeKey(event) {
      var isEscape = false;
      if ("key" in event) {
        isEscape = event.key === "Escape" || event.key === "Esc";
      } else {
        isEscape = event.keyCode === 27;
      }
      if (isEscape) {
        handleClickOutside(event);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", getEscapeKey);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", getEscapeKey);
    };
  }, [ref, hide]);
}

function ButtonSettings(props) {
  const settingsContainer = useRef(null);
  const deleteConfirm = useRef(null);
  const shadow = useRef(null);
  const [newButtonName, setNewButtonName] = useState(props.title);

  useOutsideAlerter(shadow, deleteConfirm);

  function toggleShow() {
    settingsContainer.current.classList.toggle("show");
  }

  function toggleHistory() {
    document.querySelector(".historyContainer").classList.toggle("off");
    document.querySelector("body").classList.toggle("noscroll");
  }

  function toggleDeleteConfirm(ref) {
    ref.current.classList.toggle("off");
  }

  function deleteButton(id) {
    const fetchDelete = async () => {
      const data = { id: id };
      const response = await axios({
        url: "/api/buttons/delete",
        method: "POST",
        data: data,
      });
      if (response.data) {
        props.refreshButtons();
        toggleDeleteConfirm(deleteConfirm);
      } else {
        alert("No response, the server may or may not have deleted the button");
      }
    };
    fetchDelete();
  }

  function renameButton(event) {
    event.preventDefault();
    event.stopPropagation();
    const fetchRename = async () => {
      const data = {
        id: props.forButton,
        title: newButtonName,
      };
      const response = await axios({
        url: "/api/buttons/update",
        method: "POST",
        data: data,
      });
      if (response.data) {
        console.log(response.data.button);
        props.refreshButtons();
      } else {
        console.error("Button not renamed");
      }
    };
    fetchRename();
  }

  return (
    <div className="buttonSettings">
      <FiSettings onClick={toggleShow}></FiSettings>
      <div className="buttonSettingsContainer" ref={settingsContainer}>
        <button className="closeButton" onClick={toggleShow}>
          <FiX></FiX>
        </button>
        <form
          className="buttonRenameContainer"
          onSubmit={(e) => {
            renameButton(e);
          }}
        >
          <input
            type="text"
            className="buttonRename"
            value={newButtonName}
            onChange={(e) => setNewButtonName(e.target.value)}
          ></input>
          <button type="submit">
            <FiEdit onClick={renameButton}></FiEdit>
          </button>
        </form>
        <button className="buttonHistory linkButton" onClick={toggleHistory}>
          History
        </button>
        <button
          className="buttonDelete redButton"
          onClick={() => toggleDeleteConfirm(deleteConfirm)}
        >
          Delete This Button
        </button>
      </div>
      <div className="confirmContainer off" ref={deleteConfirm}>
        <div className="shadow" ref={shadow}>
          <Confirm
            confirmCancel={() => toggleDeleteConfirm(deleteConfirm)}
            confirmAction={() => deleteButton(props.forButton)}
            noClass="greenButton"
            yesClass="redButton"
            type="delete"
            fullTitle={
              'Are you sure you want to delete the button "' +
              props.title +
              '"?'
            }
            yesText="Delete"
          ></Confirm>
        </div>
      </div>
      <div className="historyContainer off">
        <div className="historyTitle">
          {`History for button "` + props.title + `"`}
        </div>
        <button className="closeButton" onClick={toggleHistory}>
          <FiX></FiX>
        </button>
        <ul>
          {props.history.map((entry, number) => (
            <li key={props.forButton + number}>
              {entry}
              <div className="historyDelete">
                <FiX></FiX>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ButtonSettings;
