const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("event data ==>> ", event);
  await axios.post("http://posts-clusterip-srv:4000/events", event);
  // await axios.post("http://localhost:4001/events", event);
  // await axios.post('http://localhost:4003/events',event);
  res.send({ status: "OK" });
});

app.listen(4002, () => {
  console.log("event bus is running over 4002.");
});
