const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const comments = [];

app.get("/post/:id/comments", async (req, res) => {
  const comment = comments.filter((post) => {
    return post.postId === Number(req.params.id);
  });
  res.json({ comment });
});

app.post("/post/:id/comments", async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  console.log("commennts ==>>> ", comment, id);
  const newComment = {
    postId: Number(id),
    id: comments.length + 1,
    comment,
  };
  comments.push(newComment);

  await axios.post("http://localhost:4002/events", {
    type: "commentCreated",
    data: newComment,
  });

  res.json({
    data: newComment,
    message: "Comment has been added.",
  });
});

app.post("/events", async (req, res) => {
  const event = req?.body;
  console.log("Event Received : ", event);
  res.send({
    message: "event triggred successfully",
  });
});

app.listen(4001, () => {
  console.log("Comment service is running over 4001");
});
