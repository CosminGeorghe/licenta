require("dotenv").config();
var cors = require("cors");
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server started on port :", process.env.APP_PORT);
});
