const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
// app.use(cors)
app.use(bodyParser.json());

const posts = [];

app.get("/posts", async (req, res) => {
  return res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  console.log(req.body);
  const post = { id: posts.length + 1, title };
  posts.push(post);

  // await axios.post("http://localhost:4002/events", {
    await axios.post("http://event-bus-srv:4002/events", {
    type: "postCreated",
    data: post,
  });
  return res.status(201).json({
    post,
    message: "Post has been created.",
  });
});

app.post("/events", async (req, res) => {
  const event = req?.body;
  console.log("Event Received : ", event);

  res.json({
    message: "event has been triggered.",
  });
});

app.listen(4000, () => {
  console.log("Post app is running over 4000. updateddddddddd...... v55");
});
