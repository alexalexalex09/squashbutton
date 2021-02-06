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
  function (req, res, next) {
    console.log("Callback");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL,
    session: false,
  }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
