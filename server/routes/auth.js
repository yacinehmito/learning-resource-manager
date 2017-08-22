const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Item = require("../models/item");
const jwt = require("jwt-simple");
const passport = require("passport");
const config = require("../config");

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  const user = new User({
    username,
    email
  });

  User.register(user, password, err => {
    if (err) {
      return next(err);
    }
    res.json({ success: true });
  });
});

const authenticate = User.authenticate();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    authenticate(username, password, (err, user, failed) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (failed) {
        return res.status(401).json(failed.message);
      }
      if (user) {
        const payload = {
          id: user._id
        };
        const { username, _id } = user;
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({ token, id: _id, username });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
