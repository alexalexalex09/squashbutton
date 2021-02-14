import React, { useRef, useEffect } from "react";
import { Confirm } from "../components";
import axios from "axios";
import { FiSettings } from "react-icons/fi";

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

  useOutsideAlerter(shadow, deleteConfirm);

  function toggleShow() {
    settingsContainer.current.classList.toggle("show");
  }

  function toggleDeleteConfirm(ref) {
    ref.current.classList.toggle("off");
  }

  function deleteButton(id) {
    const fetchData = async () => {
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
    fetchData();
  }

  return (
    <div className="buttonSettings">
      <FiSettings onClick={toggleShow}></FiSettings>
      <div className="buttonSettingsContainer" ref={settingsContainer}>
        <button
          className="buttonDelete"
          onClick={() => toggleDeleteConfirm(deleteConfirm)}
        >
          Delete Button
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
    </div>
  );
}

export default ButtonSettings;
