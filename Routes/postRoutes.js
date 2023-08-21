const express = require("express");
const postRoutes = express.Router();
const { auth } = require("../Middleware/auth");
const { PostModel } = require("../Model/postModel");

postRoutes.use(auth);
postRoutes.post("/add", async (req, res) => {
  const { title, body, device, no_of_comments } = req.body;
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "New Post Added", post });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

postRoutes.get("/", async (req, res) => {
  try {
    const user = await PostModel.find({ userID: req.body.userID });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});
postRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await PostModel.findOne({ _id: id });
    if (user) {
      await PostModel.findByIdAndUpdate({ _id: id }, data);
      res.status(200).send({ msg: `Posts Having id ${id} has been Updarted` });
    } else {
      res.status(400).send({ msg: "Id Does not matchs " });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});
postRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
 
  try {
    const user = await PostModel.findOne({ _id: id });
    if (user) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: `Posts Having id ${id} has been Deleted` });
    } else {
      res.status(400).send({ msg: "Id Does not matchs " });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});
module.exports = { postRoutes };
