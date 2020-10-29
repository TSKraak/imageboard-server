const express = require("express");
const app = express();
const port = 4000;
const jsonParser = express.json();
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");

app.use(jsonParser);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/images", imageRouter);

function onListen() {
  console.log(`Listening on :${port}`);
}

app.listen(
  // with app.listen you assign the port and as a second argument a callback function
  port, // TCP port where the server listens
  onListen // callback runs when server starts
);
