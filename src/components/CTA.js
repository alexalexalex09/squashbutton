import React from "react";

function signUp() {
  console.log("signUp");
}

function CTA() {
  return (
    <div className="CTA">
      <div className="CTAText">
        <p>Here's a bunch of text about how awesome SquashButton is.</p>
        <p>Everybody loves it.</p>
        <p>Why don't you give it a shot?</p>
      </div>
      <div
        className="linkButton"
        onClick={function callSignUp() {
          signUp();
        }}
      >
        Join now!
      </div>
      <div className="login">
        <a href="/login">Click here to log in</a>
      </div>
    </div>
  );
}

export default CTA;
