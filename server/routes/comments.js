const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Item = require("../models/item");
const Comment = require("../models/comment");
const { ensureLoggedIn } = require("../middlewares");

router.get("/", (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then(comment => {
      res.json(comment);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", ensureLoggedIn, (req, res, next) => {
  const { author, text, timestamp } = req.body;
  const newComment = new Comment({
    author,
    text,
    timestamp
  });
  newComment.save().then(comment => res.json(comment)).catch(err => next(err));
});

router.put("/:id", (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then(comment => {
      Object.assign(comment, req.body);
      comment.save().then(data => res.json(comment)).catch(err => next(err));
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  let commentID = req.params.id;
  Comment.remove({ _id: commentID })
    .then(data => {
      Item.findOne({ comments: { $in: [commentID] } }).then(item => {
        console.log(item.comments);
        item.comments.splice(item.comments.indexOf(commentID), 1);
        console.log(item.comments);
        item.save();
      });
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
