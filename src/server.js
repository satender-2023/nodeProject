var express = require("express");
var server = express();
var routes = require("./routes/routes");
var mongoose = require("mongoose");
const cors = require("cors");
// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/todo")
  .then(() => {
    console.log("........DB connected...........");
  })
  .catch((error) => {
    console.log("........error connecting DB...........");
    console.error(error);
  });

server.use(cors());
server.use(routes);
server.use(express.json());

server.listen(3000, function check(error) {
  if (error) {
    console.log("........error port starting...........");
  } else {
    console.log("........port started...........");
  }
});