import React, { useState } from "react";
import PropTypes from "prop-types";

function SquashButton(props) {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="squashButton" id={props.id}>
      <div
        className={pressed ? "squashButtonIcon pressed" : "squashButtonIcon"}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
      ></div>
      <div className="squashButtonName">{props.name}</div>
    </div>
  );
}

SquashButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SquashButton;
