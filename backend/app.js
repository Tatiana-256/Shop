const express = require("express");

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleWares/errors");
const bodyparser = require("body-parser")
const cloudinary = require("cloudinary")


const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}))
app.use(cookieParser());

//setting up cloudinary configuration

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETS
})

// Import all routes

const products = require("./routes/product");
const auth = require("./routes/authRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
