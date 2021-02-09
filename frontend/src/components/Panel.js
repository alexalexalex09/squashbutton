import React, { Suspense } from "react";
import useFetch from "fetch-suspense";
import { AddNewButton /*, ButtonPlaceHolder */, SquashButton } from ".";

function FetchedButtons() {
  const response = useFetch("/api/buttons/read", { method: "GET" });
  if (response.buttons) {
    return response.buttons.map((button) => (
      <SquashButton id={button.id} key={button.id} {...button}></SquashButton>
    ));
  } else {
    return "No Buttons";
  }
}

function Panel() {
  return (
    <div className="panel">
      <AddNewButton></AddNewButton>
      <Suspense fallback="Loading...">
        <div className="squashButtons">
          <FetchedButtons></FetchedButtons>
        </div>
      </Suspense>
      {/*Get user buttons, then replace ButtonPlaceHolder with the user's SquashButtons*/}
    </div>
  );
}

export default Panel;
