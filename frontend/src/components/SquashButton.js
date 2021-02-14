import React, { useState } from "react";
import ButtonSettings from "../components/ButtonSettings";
import PropTypes from "prop-types";

function SquashButton(props) {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="squashButton" id={props._id}>
      <button
        className={
          pressed
            ? "squashButtonIcon pressed unselectable noFocus"
            : "squashButtonIcon unselectable noFocus"
        }
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
      ></button>
      <div className="squashButtonName">{props.title}</div>
      <ButtonSettings></ButtonSettings>
    </div>
  );
}

SquashButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SquashButton;
