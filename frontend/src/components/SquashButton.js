import React from "react";
import PropTypes from "prop-types";

function SquashButton(props) {
  return (
    <div className="squashButton" id={props.id}>
      <div className="squashButtonName">{props.name}</div>
    </div>
  );
}

SquashButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SquashButton;
