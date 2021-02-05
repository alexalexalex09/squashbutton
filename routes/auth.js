var passport = require("passport");
const express = require("express");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function (req, res) {
    var token = req.user.token;
    res.redirect("/?token=" + token);
  }
);

module.exports = router;
