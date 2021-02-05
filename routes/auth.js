var passport = require("passport");
const express = require("express");
const router = express.Router();

router.get("/google", () => {
  console.log("Getting auth google");
  passport.authenticate("google", { scope: ["profile"] });
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function (req, res) {
    res.redirect("/?token=" + req.user.token);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
