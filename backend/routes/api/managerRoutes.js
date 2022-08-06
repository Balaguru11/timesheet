//can see all employees
// can see all events with filter options
// can update the events details if needed

const express = require("express");
const managerRoute = express.Router();

const { isManager } = require("../../middlewares/matchRole");

const {
  getAllEmpEvents,
  todayEventsOnly,
  getAllEmployees,
  getOneEmpData,
  getOneEmpEvents,
} = require("../../controllers/managerController");

managerRoute.use(isManager);

managerRoute.get("/employees", getAllEmployees);

managerRoute.get("/employees/:employeeId", getOneEmpData);

managerRoute.route("/events").get(getAllEmpEvents);

managerRoute.route("/events/:employeeId").get(getOneEmpEvents);

managerRoute.get("/today-events", todayEventsOnly);

module.exports = managerRoute;
