const mongoose = require("mongoose");
require("dotenv").config();
const connectionString = process.env.MONGO_URI;
exports.connect = () => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection established"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
