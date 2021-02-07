import React, { useState, useEffect } from "react";

function signUp() {
  console.log("signUp");
}

function CTA() {
  const [data, setData] = useState("No user");
  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((res) => {
        setData(res.user.displayName);
        //TODO: Do what's actually needed here.
      });
    });
  }, [data]);
  return (
    <div className="CTA">
      <div className="CTAText">
        <p>Here's a bunch of text about how awesome SquashButton is.</p>
        <p>Everybody loves it.</p>
        <p>Why don't you give it a shot?</p>
      </div>
      <div
        className="linkButton"
        onClick={() => {
          signUp();
        }}
      >
        Join now!
      </div>
      <div className="login">
        <a href="/auth/google">Click here to log in.</a>
      </div>
      <div className="data">{data}</div>
    </div>
  );
}

export default CTA;
