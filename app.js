require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
require("./authConfig");
var authRouter = require("./routes/auth");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var compression = require("compression");

var app = express();
app.use(express.static(path.join(__dirname, "public")));

//MongoDB Setup
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

app.use(compression());

app.use("/auth", authRouter);

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
