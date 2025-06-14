const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  githubId: { type: String },
  displayName: { type: String },
  username: { type: String },
  profileUrl: { type: String },
  email: { type: String, lowercase: true, trim: true },
  avatar: { type: String },

  firstName: { type: String },
  lastName: { type: String },
  favoriteColor: { type: String },
  birthdate: { type: Date },

  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

module.exports = mongoose.model("User", userSchema);
