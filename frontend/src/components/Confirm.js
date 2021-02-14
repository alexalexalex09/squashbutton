import React from "react";
import PropTypes from "prop-types";

function Confirm(props) {
  return (
    <div className={"confirm " + props.type + "Confirm"}>
      <div className="confirmTitle">{props.fullTitle}</div>
      <div className="confirmButtons">
        <button
          className={"confirmCancel " + (props.noClass || "")}
          onClick={props.confirmCancel}
        >
          {props.cancelText || "Cancel"}
        </button>
        <button
          className={"confirmYes " + (props.yesClass || "")}
          onClick={props.confirmAction}
        >
          {props.yesText}
        </button>
      </div>
    </div>
  );
}

Confirm.propTypes = {
  confirmAction: PropTypes.func.isRequired,
  confirmCancel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  yesText: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  fullTitle: PropTypes.string.isRequired,
  yesClass: PropTypes.string,
  noClass: PropTypes.string,
};

export default Confirm;
