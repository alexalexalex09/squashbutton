import React, { useState } from "react";
import { ButtonSettings, Reorder } from "../components";
import axios from "axios";
import PropTypes from "prop-types";

function SquashButton(props) {
  const [pressed, setPressed] = useState(false);

  function pressButton(mouse = true) {
    if (!pressed) {
      //Check if it hasn't already been pressed. If not, execute.
      //This will appear as false even we set as true in the touch event
      //which comes after the mouse event
      setPressed(true);
      //We now have to check if this is a mouse event. This is set to false
      //in the touch event handler
      if (mouse) {
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
  }
  return (
    <div className="squashButton" id={props._id}>
      <button
        className={
          pressed
            ? "squashButtonIcon pressed unselectable noFocus"
            : "squashButtonIcon unselectable noFocus"
        }
        //These must appear in this order to be handled coorectly by the function above
        //If not, then it will probably also work. But maybe not.
        //Note that the pressed state variable impact both button CSS and the calling of pressButton
        onMouseDown={pressButton}
        onMouseUp={() => {
          console.log("MouseUp");
          setPressed(false);
        }}
        onTouchStart={() => pressButton(false)}
        onTouchEnd={() => {
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
