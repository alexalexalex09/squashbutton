import React from "react";
import "./App.css";
import { Navigation, Title, Home, Panel } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Router>
        <Title></Title>
        <Navigation></Navigation>
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
            component={() => {
              return <Panel></Panel>;
            }}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
