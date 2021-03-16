import React, { useState } from "react";
import { ButtonSettings, Reorder } from "../components";
import axios from "axios";
import PropTypes from "prop-types";

function SquashButton(props) {
  const [pressed, setPressed] = useState(false);

  function pressButton() {
    if (!pressed) {
      setPressed(true);
      console.log(props._id, pressed);

      const fetchRename = async () => {
        const data = {
          id: props._id,
        };
        const response = await axios({
          url: "/api/buttons/press",
          method: "POST",
          data: data,
        });
        if (response.data) {
          console.log(response.data.pressed);
          props.refreshButtons();
        } else {
          console.error("Button not pressed");
        }
      };
      fetchRename();
    }
  }
  return (
    <div className="squashButton" id={props._id}>
      <button
        className={
          pressed
            ? "squashButtonIcon pressed unselectable noFocus"
            : "squashButtonIcon unselectable noFocus"
        }
        onMouseDown={pressButton}
        onMouseUp={() => {
          console.log("MouseUp");
          setPressed(false);
        }}
      ></button>
      <div className="squashButtonName">{props.title}</div>
      <div className="lastPressed">
        Last Pressed: {props.history[0] || "Never"}
      </div>
      <ButtonSettings
        title={props.title}
        forButton={props._id}
        refreshButtons={props.refreshButtons}
        history={props.history}
      ></ButtonSettings>
      <Reorder
        position={props.position}
        refreshButtons={props.refreshButtons}
        reorderButtons={props.reorderButtons}
        totalButtons={props.totalButtons}
      ></Reorder>
    </div>
  );
}

SquashButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SquashButton;
