const app = require("./app");
const connectDataBase = require("./config/database");

const dotenv = require("dotenv");

//Handle Uncaught exceptions

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down server due to uncaught exceptions");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

//connecting to dataBase

connectDataBase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});

//Handle unhandled promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
