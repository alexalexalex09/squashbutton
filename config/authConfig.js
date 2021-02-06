require("dotenv").config();
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/Users");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:4000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Got it!");
      User.findOne({ profile_id: profile.id }).exec((err, curUser) => {
        if (curUser) {
          if (typeof curUser.name == "undefined") {
            curUser.name = profile.displayName;
            curUser.save().then(() => {
              done(null, curUser);
            });
          } else {
            done(null, curUser);
          }
        } else {
          newUser = {
            profile_id: profile.id,
            name: profile.displayName,
          };
          curUser = new User(newUser);
          curUser.save().then(() => {
            done(null, curUser);
          });
        }
      });
    }
  )
);

/*
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:4000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Got it!");
      var userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken,
      };
      User.findOne({ profile_id: profile.id }).exec((err, curUser) => {
        if (curUser) {
          if (typeof curUser.name == "undefined") {
            curUser.name = profile.displayName;
            curUser.save().then(() => {
              res.locals.username = curUser.name;
              return done(null, curUser);
            });
          } else {
            res.locals.username = curUser.name;
            return done(null, curUser);
          }
        } else {
          res.locals.username = "";
          newUser = {
            profile_id: profile.id,
            name: profile.displayName,
          };
          res.locals.username = profile.displayName;
          curUser = new User(newUser);
          curUser.save().then(() => {
            return done(null, curUser);
          });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
*/
