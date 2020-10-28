const express = require("express");
const app = express();
const port = 4000;

app.use(express.json()); // body-parsers

function onListen() {
  console.log(`Listening on :${port}`);
}

app.listen(
  // with app.listen you assign the port and as a second argument a callback function
  port, // TCP port where the server listens
  onListen // callback runs when server starts
);
