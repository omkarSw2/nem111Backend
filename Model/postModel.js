const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: { type: String },
  body: { type: String },
  device: { type: String },
  no_of_comments: { type: Number },
  userID: { type: String },
  user: { type: String },
});
const PostModel = mongoose.model("post", postSchema);
module.exports = { PostModel };
