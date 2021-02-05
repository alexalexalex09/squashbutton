require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var authRouter = require("./routes/auth");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var compression = require("compression");
var passport = require("passport");
var mongoose = require("./mongo");
var User = require("./models/Users");

var app = express();
app.use(express.static(path.join(__dirname, "frontend/build")));

//MongoDB Cookie Storage Setup
var sess = {
  secret: process.env.CONNECT_MONGO_SECRET,
  saveUninitialized: true, // create session before something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({ url: process.env.MONGO_CONNECT_STRING }),
  cookie: {},
};
if (app.get("env") === "production") {
  sess.cookie.secure = true; // Use secure cookies in production (requires SSL/TLS)
  app.set("trust proxy", 1); //Use if behind proxy, such as Heroku
}
app.use(session(sess));

//Use Compression
app.use(compression());

//Passport setup
app.use(passport.initialize());
require("dotenv").config();
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

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
      var userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken,
      };
      done(null, userData);
    }
  )
);

console.log("looking for routes");
app.get("/auth/google", () => {
  console.log("Getting auth google");
  passport.authenticate("google", { scope: ["profile"] });
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function (req, res) {
    res.redirect("/?token=" + req.user.token);
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use(function (req, res, next) {
  console.log("Finding user:" + typeof req.user);
  if (req.user) {
    User.findOne({ profile_id: req.user.id }).exec((err, curUser) => {
      if (curUser) {
        if (typeof curUser.name == "undefined") {
          curUser.name = req.user.displayName;
          curUser.save().then(() => {
            res.locals.username = curUser.name;
            //console.log("Name is " + res.locals.username);
            next();
          });
        } else {
          res.locals.username = curUser.name;
          next();
        }
      } else {
        res.locals.username = "";
        newUser = {
          profile_id: req.user.id,
          name: req.user.displayName,
        };
        res.locals.username = req.user.displayName;
        curUser = new User(newUser);
        curUser.save().then(() => {
          next();
        });
      }
    });
  } else {
    console.log("No user yet");
    next();
  }
});

//Routes
//app.use("/auth", authRouter);

app.get("*", (req, res) => {
  console.log("Url: " + req.url);
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

module.exports = app;
