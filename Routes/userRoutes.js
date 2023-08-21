const express = require("express");
const { UserModel } = require("../Model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersRoute = express.Router();
const { BlackListModel } = require("../Model/blackListModel");

usersRoute.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    const userexist = await UserModel.find({ email: email });
    if (userexist.length > 0) {
      return res.status(400).send({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 2, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          return res.status(400).send({ msg: err });
        } else {
          const user = new UserModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
            is_married,
          });
          await user.save();
          res.status(200).send({ msg: "User has Registerd" });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

usersRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        // result == true
        if (result) {
          var token = jwt.sign({ userID: user._id, user: user.name }, "omkar", {
            expiresIn: "7d",
          });
          res.send({ msg: "Login Success ", token });
        } else {
          res.status(400).send({ err });
        }
      });
    } else {
      res.status(400).send({ msg: "Email des not found please register" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

usersRoute.get("/logout", async (req, res) => {
  const headers = req.headers.authorization;
  try {
    await BlackListModel.updateMany({}, { $push: { blacklist: [headers] } });

    res.status(200).send("Logout Success !...");
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = { usersRoute };
// going for wash room
