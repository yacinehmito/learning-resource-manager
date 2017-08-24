require("dotenv").config();
const history = require("express-history-api-fallback");
express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
//mongoose.connect("mongodb://localhost/resource-app", { useMongoClient: true });
const { ensureLoggedIn, pass } = require("./middlewares");
const strict = false;

const passport = require("passport");
const User = require("./models/user");

const config = require("./config");
const { Strategy, ExtractJwt } = require("passport-jwt");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.initialize();

const strategy = new Strategy(
  {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  (payload, done) => {
    User.findById(payload.id).then(user => {
      if (user) {
        done(null, user);
      } else {
        done(new Error("User not found"));
      }
    });
  }
);

passport.use(strategy);
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const commentsRoutes = require("./routes/comments");
const itemsRoutes = require("./routes/items");
const subjectsRoutes = require("./routes/subjects");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "content-type, Authorization");
  next();
});

app.use("/api", (req, res, next) => {
  const authenticate = passport.authenticate(
    "jwt",
    config.jwtSession,
    (err, user, fail) => {
      req.user = user;
      next(err);
    }
  );
  authenticate(req, res, next);
});

const getMiddleware = () => (strict ? ensureLoggedIn : pass);

app.use("/api", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/comments", getMiddleware(), commentsRoutes);
app.use("/api/items", getMiddleware(), itemsRoutes);
app.use("/api/subjects", subjectsRoutes);

const clientRoot = path.join(__dirname, "../client/dist");
app.use("/", express.static(clientRoot));
app.use(history("index.html", { root: clientRoot }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
