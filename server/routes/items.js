const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Item = require("../models/item");
const Comment = require("../models/comment");

router.get("/", (req, res, next) => {
  Item.find()
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  const { url, headline, contributor, comments, upvotes } = req.body;

  const newItem = new Item({
    url,
    headline,
    contributor,
    comments,
    upvotes
  });
  newItem.save().then(data => res.json(newItem)).catch(err => next(err));
});

router.get("/:id", (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .then(item => {
      res.json(item);
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

router.delete("/:id", (req, res, next) => {
  Item.remove({ _id: req.params.id })
    .then(msg => {
      res.json(msg);
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  let itemId = req.params.id;
  Comment.remove({ _id: itemId })
    .then(data => {
      User.findOne({ items: { $in: [itemId] } }).then(user => {
        user.items.splice(user.items.indexOf(itemId), 1);
        user.save();
      });
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
