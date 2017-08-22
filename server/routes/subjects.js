const express = require("express");
const router = express.Router();
const subjects = [
  "all",
  "css",
  "html",
  "javascript (vanilla)",
  "nodeJS",
  "mongoDB / mongoose",
  "express",
  "vueJS"
];

router.get("/", (req, res, next) => {
  res.json(subjects);
});

router.post("/", (req, res, next) => {
  const { subject } = req.body;
  subjects.push(subject);
  res.json("added!");
});

module.exports = router;
