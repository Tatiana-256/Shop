const express = require("express");

const errorMiddleware = require("./middleWares/errors")

const app = express();

app.use(express.json());

// Import all routes

const products = require("./routes/product");

app.use("/api/v1", products);

// Middleware to handle errors
app.use(errorMiddleware)

module.exports = app;
