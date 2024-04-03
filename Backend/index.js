const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("backend listening on port 3000");
});

app.use(cors());

app.get("/products", function (req, res, next) {
  res.json({
    msg: "This is CORS-enabled for all origins!",
    orgin: "hello world",
  });
});

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("mongodb listening on port 3000");
  })
  .catch((error) => {
    console.log(error);
  });
