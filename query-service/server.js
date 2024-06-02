const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get("/getPostsWithComments/:id", async (req, res) => {
  const { id } = req.params;
  res.send({
    posts: posts[id] ?? [],
    message: "Posts has been fetched.",
  });
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "postCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "commentCreated") {
    const { postId } = data;
    posts[postId].comments = [...posts[postId].comments, data];
  }
  console.log("posts ==>>> ", posts);
  res.send({});
});

app.listen(4003, () => {
  console.log("Query app is listening over 4003. ");
});
