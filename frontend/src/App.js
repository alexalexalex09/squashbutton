import React, { useState } from "react";
import { Home, Title } from "./components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "@loadable/component";
import { UserContext } from "./context/UserContext";

/* Lazy Imports */
function lazyImportPanel() {
  import("./components/Panel");
}

/*function lazyImportHome() {
  import("./components/Home");
}*/

function loading() {
  <div className="loading">Loading</div>;
}

const Panel = Loadable({ loader: lazyImportPanel, loading: loading });

/*Component functions*/
function login() {
  console.log("login");
  return null;
}

/*Main return*/
function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="container">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Title></Title>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/panel" exact component={Panel}></Route>
            <Route
              path="/login"
              exact
              component={function showLogin() {
                login();
                return null;
              }}
            ></Route>
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
