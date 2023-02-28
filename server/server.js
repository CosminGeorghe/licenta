require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server started on port :", process.env.APP_PORT);
});

