const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  spotify_id: {
    type: String,
    trim: true,
    unique: true,
  },
  top_artists: {
    type: [String],
  },
});

module.exports = User = mongoose.model("user", userSchema);
