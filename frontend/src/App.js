import React, { useState } from "react";
import { Page, Title } from "./components";
import { UserContext } from "./context/UserContext";

/*Main return*/
function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="container">
      {/*Let each section have access to user variable*/}
      <UserContext.Provider value={{ user, setUser }}>
        {/*Header on every page*/}
        <Title></Title>
        {/*Conditionally render based on whether user is logged in*/}
        <Page></Page>
      </UserContext.Provider>
    </div>
  );
}

export default App;
