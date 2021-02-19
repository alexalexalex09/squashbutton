import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { AddNewButton /*, ButtonPlaceHolder */, SquashButton } from ".";

function Panel() {
  const [buttons, setButtons] = useState([]);
  const [refreshButton, setRefreshButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        url: "/api/buttons/read",
        method: "GET",
      });
      if (response.data) {
        setButtons(response.data.buttons);
        setRefreshButton(false);
      } else {
        console.error("No data retrieved");
      }
    };
    fetchData();
  }, [refreshButton]);

  function toggleRefreshButtons() {
    setRefreshButton(true);
  }

  function reorderButtons(moveFrom, moveTo) {
    console.log(moveFrom, moveTo);
    console.log(buttons[moveFrom].title);
    let newButtons = Array.from(buttons);
    newButtons[moveFrom] = buttons[moveTo];
    newButtons[moveTo] = buttons[moveFrom];
    console.log(newButtons[moveFrom].title);
    setButtons(newButtons);
  }

  return (
    <div className="panel">
      <AddNewButton refreshButtons={toggleRefreshButtons}></AddNewButton>
      <Suspense fallback="Loading...">
        <div className="squashButtons">
          {buttons.map((button, position) => (
            <SquashButton
              refreshButtons={toggleRefreshButtons}
              id={button._id}
              key={button._id}
              position={position}
              reorderButtons={reorderButtons}
              totalButtons={buttons.length}
              {...button}
            ></SquashButton>
          ))}
        </div>
      </Suspense>
      {/*Get user buttons, then replace ButtonPlaceHolder with the user's SquashButtons*/}
    </div>
  );
}

export default Panel;
