const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  gender: { type: String },
  password: { type: String },
  age: { type: Number },
  city: { type: String },
  is_married: { type: Boolean },
});
const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
