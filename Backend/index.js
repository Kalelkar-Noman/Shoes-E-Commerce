const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("backend listening on port 3000");
});

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("mongodb listening on port 3000");
  })
  .catch((error) => {
    console.log(error);
  });
