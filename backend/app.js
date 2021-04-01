const express = require("express");

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleWares/errors");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Import all routes

const products = require("./routes/product");
const auth = require("./routes/authRoute");

app.use("/api/v1", products);
app.use("/api/v1", auth);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
