const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"]
  },
  items: [Schema.Types.ObjectId] // list of item id's - n ITEMS CONTRIBUTED BY THIS USER
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
