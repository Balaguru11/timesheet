const express = require("express");
require("dotenv").config();
const corsOptions = require("./config/corsOptions");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
require("./config/dbConnection").connect();

const verifyJWT = require("./middlewares/verifyJWT");
const app = express();

let port = process.env.PORT || 8086;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  console.log("Backend Started");
  res.send("Welcome to the first Page");
});

const adminRoute = require("./routes/api/adminRoute");
app.use("/admin", adminRoute);
const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);
app.use(verifyJWT);
const employeeRoute = require("./routes/api/empRoutes");
const managerRoute = require("./routes/api/managerRoutes");
app.use("/employee", employeeRoute);
app.use("/manager", managerRoute);

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});

//admin adding employee, manages active and inactive status

// employee view - calendar (event), choose today's date to add event.
