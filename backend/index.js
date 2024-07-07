require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require("cors");
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  console.log("I am in Health api");
  res.json({
    service: "Backend Ecommerce site server",
    status: "active",
    time: new Date(),
  });
});

app.use("/api/v1/auth", authRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/orders', orderRoute);

app.use((error, req, res, next) => {
  res.status(500).json({ errorMessage: "Something went wrong!" });
});

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Backend Server Listening at port: ${PORT}`))
    .catch((err) => console.log(err));
});