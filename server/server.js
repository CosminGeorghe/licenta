require("dotenv").config();
var cors = require("cors");
const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const app = express();
const userRouter = require("./api/users/user.router");
const productRouter = require("./api/products/product.router");
const categoryRouter = require("./api/categories/category.router");
const subcategoryRouter = require("./api/subcategories/subcategory.router");
const cartRouter = require("./api/cart/cart.router");
const OrdersRouter = require("./api/orders/order.router");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "cosminesupertare@gmail.com",
    pass: "fkobostulbvplboa",
  },
});

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/send-reset-password-to-email", (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: "cosminesupertare@gmail.com",
    to: email,
    subject: "Cerere de resetare parola",
    text: `Pentru a iti reseta parola te rugam sa accesezi linkul de mai jos\n ${resetLink}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent");
    }
  });
  res.status(200).send(resetLink);
});

app.post("/api/send-email", (req, res) => {
  const { recipient, subject, message } = req.body;

  const mailOptions = {
    from: "cosminesupertare@gmail.com",
    to: recipient,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent");
    }
  });
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subcategoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", OrdersRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server started on port :", process.env.APP_PORT);
});
