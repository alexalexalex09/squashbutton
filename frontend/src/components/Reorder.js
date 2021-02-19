import React from "react";
import axios from "axios";
import { FaRegCaretSquareDown, FaRegCaretSquareUp } from "react-icons/fa";

function Reorder(props) {
  function move(direction) {
    const move = direction === "up" ? -1 : 1;
    if (
      -1 < props.position + move &&
      props.position + move < props.totalButtons
    ) {
      const moveFrom = props.position;
      const moveTo = Number(props.position + move);
      const fetchMove = async () => {
        const data = {
          moveFrom: moveFrom,
          moveTo: moveTo,
        };
        const response = await axios({
          url: "/api/buttons/move",
          method: "POST",
          data: data,
        });
        if (response.data) {
          console.log(response.data);
          props.reorderButtons(moveFrom, moveTo);
        } else {
          console.error("Button not moved");
        }
      };
      fetchMove();
    } else {
      console.log("Invalid move");
    }
  }
  return (
    <div className="reorder">
      <FaRegCaretSquareUp onClick={() => move("up")}></FaRegCaretSquareUp>
      <FaRegCaretSquareDown onClick={() => move("down")}></FaRegCaretSquareDown>
    </div>
  );
}

export default Reorder;
