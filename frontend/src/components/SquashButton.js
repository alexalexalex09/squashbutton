import React, { useState } from "react";
import PropTypes from "prop-types";

function SquashButton(props) {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="squashButton" id={props.id}>
      <button
        className={
          pressed
            ? "squashButtonIcon pressed unselectable"
            : "squashButtonIcon unselectable"
        }
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
      ></button>
      <div className="squashButtonName">{props.name}</div>
    </div>
  );
}

SquashButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SquashButton;
