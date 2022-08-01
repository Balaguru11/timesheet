//can see all employees
// can see all events with filter options
// can update the events details if needed

const express = require("express");
const managerRoute = express.Router();

const {
  getAllEmpEvengts,
  todayEventsOnly,
} = require("../../controllers/managerController");

managerRoute.route("/events").get(getAllEmpEvengts);

managerRoute.get("/events/today", todayEventsOnly);

module.exports = managerRoute;
