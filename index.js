const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { usersRoute } = require("./Routes/userRoutes");
const { postRoutes } = require("./Routes/postRoutes");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", usersRoute);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  try {
    res.status(200).send({ msg: "Home Routes" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.listen(8080, async () => {
  try {
    connection;
    console.log("connected");
    console.log("on the port 8080");
  } catch (error) {
    console.log({ error: error });
  }
});
