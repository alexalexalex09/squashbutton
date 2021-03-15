import React from "react";
import PropTypes from "prop-types";

function Dialog(props) {
  function preventAndConfirm(event) {
    event.preventDefault();
    event.stopPropagation();
    props.confirmAction();
  }

  return (
    <div className={"dialog " + props.type + "Dialog"}>
      <div className="dialogTitle">{props.fullTitle}</div>
      <form
        className="dialogButtons"
        onSubmit={(e) => {
          preventAndConfirm(e);
        }}
      >
        <input
          type="text"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        ></input>
        <button
          className={"dialogCancel " + (props.noClass || "")}
          onClick={props.confirmCancel}
        >
          {props.cancelText || "Cancel"}
        </button>
        <button className={"dialogYes " + (props.yesClass || "")} type="submit">
          {props.yesText}
        </button>
      </form>
    </div>
  );
}

Dialog.propTypes = {
  confirmAction: PropTypes.func.isRequired,
  confirmCancel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  yesText: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  fullTitle: PropTypes.string.isRequired,
  yesClass: PropTypes.string,
  noClass: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default Dialog;
