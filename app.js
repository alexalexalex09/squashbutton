require("dotenv").config();
require("./mongo"); //Set up the mongo connection so that others can use it
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
const compression = require("compression");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var authRouter = require("./routes/auth");
var apiRouter = require("./routes/api");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const User = require("./models/Users");

var app = express();

//Set directory for serving react files based on whether we're in production or not
if (app.get("env") === "production") {
  process.env.REACT_DIR = "/frontend/build";
} else {
  process.env.REACT_DIR = "/frontend/public";
}

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
var strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:
      process.env.GOOGLE_CALLBACK_URL ||
      "http://localhost:4000/auth/google/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    console.log("Got it!");
    console.log("ID: " + profile.id);
    return done(null, profile);
  }
);
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//Rest of express setup at the right time
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Save new user if needed
app.use((req, res, next) => {
  if (req.user) {
    //res.locals.user = req.user; //Not sure if this works in React
    var profile = req.user;
    User.findOne({ profile_id: profile.id }).exec((err, curUser) => {
      if (curUser) {
        if (typeof curUser.name == "undefined") {
          curUser.name = profile.displayName;
          curUser.save().then(() => {
            next();
          });
        } else {
          next();
        }
      } else {
        newUser = {
          profile_id: profile.id,
          name: profile.displayName,
        };
        curUser = new User(newUser);
        curUser.save().then(() => {
          next();
        });
      }
    });
  } else {
    console.log("No user to save");
    next();
  }
});

//Routes
app.use("/", authRouter);
app.use("/", apiRouter);

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
  console.log("Error: " + err);
  res.status(err.status || 500);
  res.send("error: " + err);
});

module.exports = app;
