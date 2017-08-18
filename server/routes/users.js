const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Item = require("../models/item");
const Comment = require("../models/comment");

router.get("/", (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      next(err);
    });
});

router.put("/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      Object.assign(user, req.body);
      user.save().then(data => res.json(user)).catch(err => next(err));
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
