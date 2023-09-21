const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: String,
  hash: String,
  salt: String,
  token: String,
  avatar_user: Object,
  favouriteGames: Array,
  Reviews: Array
});

module.exports = User;
