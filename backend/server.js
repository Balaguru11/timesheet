const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
require("./config/dbConnection").connect();
const app = express();

const port = process.env.PORT || 8082;
console.log(port);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  console.log("Backend Started");
  res.send("Welcome to the first Page");
});

// const port = 3000;

// mongoose.connection.once("open", () => {
// console.log("DB Connected at Server.js");
app.listen((port) => () => {
  console.log(`listening on port `);
});
// });
