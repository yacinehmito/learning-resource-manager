const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  url: {
    type: String,
    required: [true, "url is required"]
  },
  description: {
    type: String,
    required: [true, "description is required"]
  },
  headline: {
    type: String,
    required: true
  },
  contributor: {
    type: Schema.Types.ObjectId, // one user id - 1 USER WHO CONTRIBUTED THIS ITEM
    required: true
  },
  comments: [Schema.Types.ObjectId], // list of comment id's - n COMMENTS POSTED TO THIS ITEM
  upvotes: [Schema.Types.ObjectId], // list of user id's - n USERS WHO UPVOTED THIS ITEM
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Item", itemSchema);
