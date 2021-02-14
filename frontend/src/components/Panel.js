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

  return (
    <div className="panel">
      <AddNewButton refreshButtons={toggleRefreshButtons}></AddNewButton>
      <Suspense fallback="Loading...">
        <div className="squashButtons">
          {buttons.map((button) => (
            <SquashButton
              refreshButtons={toggleRefreshButtons}
              id={button._id}
              key={button._id}
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
