const mongoose = require("mongoose");
const { config } = require("dotenv");
config();

// require("dotenv").config();

const dbConnect = () => {
  // console.log(process.env.DATABASE_URL);
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connection is Successful"))
    .catch((error) => {
      console.log("Issue in DB Connection");
      console.error(error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
