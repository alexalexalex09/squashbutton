require("dotenv").config();
require("./mongo"); //Set up the mongo connection so that others can use it
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
var authRouter = require("./routes/auth");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const compression = require("compression");

var app = express();

//Set directory for serving react files based on whether we're in production or not
/*if (app.get("env") === "production") {
  process.env.REACT_DIR = "/frontend/build";
} else {
  process.env.REACT_DIR = "/frontend/public";
}*/

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  if (req.user) {
    var theuser = req.user;
    console.log({ theuser });
  } else {
    console.log("No user");
  }
  next();
});

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
require("./config/authConfig");

app.use("/", authRouter);

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
  res.send("error: " + err);
});

module.exports = app;
