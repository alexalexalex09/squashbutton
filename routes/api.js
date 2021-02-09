const express = require("express");
const router = express.Router();

router.get("/api/user", (req, res) => {
  res.send({ user: req.user });
});

router.get("/api/buttons/create", (req, res) => {
  res.send({ buttons: [{ id: "create" }], user: req.user });
});

router.get("/api/buttons/read", (req, res) => {
  res.send({ buttons: [{ id: "read", name: "readButton" }], user: req.user });
});

router.get("/api/buttons/update", (req, res) => {
  res.send({ buttons: [{ id: "update" }], user: req.user });
});

router.get("/api/buttons/delete", (req, res) => {
  res.send({ buttons: [{ id: "delete" }], user: req.user });
});

module.exports = router;
