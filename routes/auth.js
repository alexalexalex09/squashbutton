require("dotenv").config();
var passport = require("passport");
const express = require("express");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  (req, res, next) => {
    console.log("Callback");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL,
    session: false,
  }),
  function (req, res) {
    req.logIn(req.user, function (err) {
      res.redirect(process.env.CLIENT_URL);
    });
  }
);

router.get("/auth/logout", (req, res) => {
  console.log("Logout");
  req.logout();
  res.redirect("/");
});

module.exports = router;
