import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

function signUp() {
  console.log("signUp");
}

function CTA() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((res) => {
        if (res.user) {
          setUser(res.user.displayName);
        } else {
          console.log("No user found");
        }
      });
    });
  }, [setUser]);

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
    </div>
  );
}

export default CTA;
