import React, { useContext, useState } from "react";
import { Home, Panel } from "../components";
import { ButtonContext } from "../context/ButtonContext";
import { UserContext } from "../context/UserContext";

function Page() {
  const { user } = useContext(UserContext);
  const [buttons, setButtons] = useState(null);
  if (user === null) {
    return <Home></Home>;
  } else {
    return (
      <ButtonContext.Provider value={{ buttons, setButtons }}>
        <Panel></Panel>
      </ButtonContext.Provider>
    );
  }
}

export default Page;
