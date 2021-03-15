const express = require("express");
const router = express.Router();
const Button = require("../models/Buttons");
const User = require("../models/Users");

router.get("/api/user", (req, res) => {
  res.send({ user: req.user });
});

router.post("/api/user/set_prefs", (req, res) => {
  //TODO
  res.send({ success: "Set light mode, time zone, date format, and username" });
});

router.post("/api/buttons/create", (req, res) => {
  //Create a new button object
  let newButton = new Button({
    title: req.body.title,
    colors: [{ interval: 1000 * 60 * 60 * 24, color: "#ffffff" }],
  });
  //Save the object to the DB
  newButton.save().then((newButton) => {
    //Get the user that we're adding the button to
    User.findOne({ profile_id: req.user.id.toString() }).exec(
      (err, curUser) => {
        if (err) {
          res.send({ error: err });
        } else {
          if (curUser.buttons === null) {
            //If no new buttons, create the first button
            curUser.buttons = [newButton._id];
          } else {
            //Otherwise, push a new button
            curUser.buttons.push(newButton._id);
          }
          //Save it, look it up to return it lean, and send it back
          curUser.save().then(() => {
            Button.findById(newButton._id)
              .lean()
              .exec((err, curButton) => {
                res.send({ button: curButton });
              });
          });
        }
      }
    );
  });
});

router.get("/api/buttons/read", (req, res) => {
  User.findOne({ profile_id: req.user.id })
    .populate("buttons")
    .lean()
    .exec((err, curUser) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send({ buttons: curUser.buttons });
      }
    });
});

//Update takes button id and settings: title and/or colors (as Array containing interval and color)
router.post("/api/buttons/update", (req, res) => {
  Button.findById(req.body.id).exec((err, curButton) => {
    if (err) {
      res.send({ error: err });
    } else {
      //Replace the title if the user has sent a new one
      curButton.title = req.body.title || curButton.title;
      //If the user has defined any colors to replace, replace them
      if (req.body.colors && Array.isArray(req.body.colors)) {
        let colors = req.body.colors;
        colors.forEach((newColor) => {
          //Without an index defined, we can't look up the color
          if (newColor.index) {
            curButton.colors[newColor.index] = {
              interval: newColor.interval || colors[newColor.index].interval,
              color: newColor.color || colors[newColor.index].color,
            };
          }
        });
      }
      //Save it, look it up to return it lean, and send it back
      curButton.save().then((newButton) => {
        Button.findById(newButton._id)
          .lean()
          .exec((err, curButton) => {
            res.send({ button: curButton });
          });
      });
    }
  });
});

router.post("/api/buttons/move", (req, res) => {
  if (
    typeof req.body.moveFrom !== "undefined" &&
    typeof req.body.moveTo !== "undefined"
  ) {
    User.findOne({ profile_id: req.user.id }).exec((err, curUser) => {
      if (err) {
        res.send({ error: err });
      } else {
        if (
          -1 < req.body.moveFrom &&
          req.body.moveFrom < curUser.buttons.length &&
          -1 < req.body.moveTo &&
          req.body.moveTo < curUser.buttons.length
        ) {
          curUser.buttons.splice(
            req.body.moveTo,
            0,
            curUser.buttons.splice(req.body.moveFrom, 1)[0]
          );
          curUser.save().then(() => {
            res.send({ success: true });
          });
        } else {
          res.send({
            error:
              "Cannot move from " +
              req.body.moveFrom +
              " to " +
              req.body.moveTo,
          });
        }
      }
    });
  } else {
    res.send({ error: "No move sent" });
  }
});

router.post("/api/buttons/delete", (req, res) => {
  if (req.body.id) {
    User.findOne({ profile_id: req.user.id }).exec((err, curUser) => {
      if (err) {
        res.send({ error: err });
      } else {
        let index = curUser.buttons.findIndex((el) => {
          el._id.toString() === req.body.id.toString();
        });
        curUser.buttons.splice(index, 1);
        curUser.save().then(() => {
          res.send({ success: true });
        });
      }
    });
  } else {
    res.send({ error: "No ID Found" });
  }
});

router.post("/api/buttons/press", (req, res) => {
  //TODO
  Button.findById(req.body.id).exec((err, curButton) => {
    const pressed = new Date();
    const pressedFormatted = pressed.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    curButton.history.splice(0, 0, pressedFormatted);
    if (curButton.history.length > 1000) {
      curButton.history.length = 1000;
    }
    curButton.save().then(() => {
      res.send({
        pressed: pressedFormatted,
      });
    });
  });
});

router.post("/api/buttons/unpress", (req, res) => {
  //TODO
  res.send({ success: "Deleted the last history entry" });
});

module.exports = router;
