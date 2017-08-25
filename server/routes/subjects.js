const express = require("express");
const router = express.Router();
const subjects = [
  "all",
  "CSS",
  "HTML",
  "JavaScript",
  "NodeJS",
  "MongoDB",
  "ExpressJS",
  "VueJS",
  "General"
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
