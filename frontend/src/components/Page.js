import React, { useContext } from "react";
import { Home, Panel } from "../components";
import { UserContext } from "../context/UserContext";

function Page() {
  const { user } = useContext(UserContext);
  if (user == null) {
    return <Home></Home>;
  } else {
    return <Panel></Panel>;
  }
}

export default Page;
