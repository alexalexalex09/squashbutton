import React from "react";
import { Title, Home, Panel } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function login() {
  console.log("login");
  return null;
}

function App() {
  return (
    <div className="container">
      <Router>
        <Title></Title>
        <Switch>
          <Route
            path="/"
            exact
            component={() => {
              return <Home></Home>;
            }}
          ></Route>

          <Route
            path="/app"
            exact
            component={function showPanel() {
              return <Panel></Panel>;
            }}
          ></Route>

          <Route
            path="/login"
            exact
            component={function showLogin() {
              login();
              return null;
            }}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
