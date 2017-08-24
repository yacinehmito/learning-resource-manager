const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Item = require("../models/item");
const Comment = require("../models/comment");
const { ensureLoggedIn } = require("../middlewares");

router.get("/", (req, res, next) => {
  Item.find()
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", ensureLoggedIn, (req, res, next) => {
  const {
    url,
    headline,
    contributor,
    comments,
    upvotes,
    description,
    timestamp,
    subject
  } = req.body;

  const newItem = new Item({
    url,
    headline,
    contributor,
    comments,
    upvotes,
    description,
    timestamp,
    subject
  });
  newItem
    .save()
    .then(item => {
      User.findOne({ _id: contributor }).then(user => {
        user.items.push(item._id);
        user.save();
      });
      return res.json(item);
    })
    .catch(err => next(err));
});

router.get("/:id", (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .then(item => {
      return res.json(item);
    })
    .catch(err => {
      next(err);
    });
});

router.put("/:id", (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .then(item => {
      Object.assign(item, req.body);
      item.save().then(data => res.json(item)).catch(err => next(err));
    })
    .catch(err => {
      next(err);
    });
});

/*
router.delete("/:id", (req, res, next) => {
  Item.remove({ _id: req.params.id }).then(msg => res.json(msg)).catch(err => {
    next(err);
  });
});
*/

router.delete("/:id", (req, res, next) => {
  let itemId = req.params.id;
  Item.remove({ _id: itemId })
    .then(data => {
      User.findOne({ items: { $in: [itemId] } }).then(user => {
        user.items.splice(user.items.indexOf(itemId), 1);
        user.save();
      });
      return res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
