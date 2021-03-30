const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/shopit", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) =>
      console.log(`MongoDB database connected with ${con.connection.host}`)
    );
};

module.exports = connectDatabase;
