import React, { useRef } from "react";
import { FiSettings } from "react-icons/fi";

function ButtonSettings() {
  const settingsContainer = useRef(null);
  function toggleShow() {
    settingsContainer.current.classList.toggle("show");
  }
  return (
    <div className="buttonSettings">
      <FiSettings onClick={toggleShow}></FiSettings>
      <div className="buttonSettingsContainer" ref={settingsContainer}>
        <button className="buttonDelete">Delete Button</button>
      </div>
    </div>
  );
}

export default ButtonSettings;
