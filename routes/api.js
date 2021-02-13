const express = require("express");
const router = express.Router();
const Button = require("../models/Buttons");
const User = require("../models/Users");

router.get("/api/user", (req, res) => {
  res.send({ user: req.user });
});

router.post("/api/buttons/create", (req, res) => {
  //TODO: rewrite to make bulk creation available
  let newButton = new Button({
    title: req.body.title,
    colors: [{ interval: 1000 * 60 * 60 * 24, color: "#ffffff" }],
  });
  newButton.save().then((newButton) => {
    User.findOne({ profile_id: req.user.id.toString() }).exec(
      (err, curUser) => {
        if (curUser.buttons === null) {
          curUser.buttons = [newButton._id];
        } else {
          curUser.buttons.push(newButton._id);
        }
        curUser.save().then(() => {
          Button.findById(newButton._id)
            .lean()
            .exec((err, curButton) => {
              res.send(curButton);
            });
        });
      }
    );
  });
});

router.get("/api/buttons/read", (req, res) => {
  User.findOne({ profile_id: req.user.id })
    .populate("buttons")
    .lean()
    .exec((err, curUser) => {
      res.send({ buttons: curUser.buttons });
    });
});

router.post("/api/buttons/update", (req, res) => {
  res.send({ buttons: [{ id: "update" }], user: req.user });
});

router.post("/api/buttons/delete", (req, res) => {
  res.send({ buttons: [{ id: "delete" }], user: req.user });
});

module.exports = router;
