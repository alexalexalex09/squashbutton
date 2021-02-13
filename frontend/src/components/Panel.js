import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { AddNewButton /*, ButtonPlaceHolder */, SquashButton } from ".";

function Panel() {
  const [buttons, setButtons] = useState([]);
  const [createButton, setCreateButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        url: "/api/buttons/read",
        method: "GET",
      });
      if (response.data) {
        setButtons(response.data.buttons);
        setCreateButton(false);
        console.log({ createButton });
      } else {
        console.error("No data retrieved");
      }
    };
    fetchData();
  }, [createButton]);

  function toggleCreateButton() {
    setCreateButton(true);
    console.log({ createButton });
  }

  return (
    <div className="panel">
      <AddNewButton createFunction={toggleCreateButton}></AddNewButton>
      <Suspense fallback="Loading...">
        <div className="squashButtons">
          {buttons.map((button) => (
            <SquashButton
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
