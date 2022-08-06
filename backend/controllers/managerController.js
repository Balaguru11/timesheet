const EventModel = require("../model/eventModel");
const UserModel = require("../model/userModel");

exports.getAllEmpEvents = async (req, res) => {
  try {
    const user = req.user;
    const allEmpEvents = await EventModel.find({}).populate("createdBy");
    console.log(allEmpEvents);
    res.json(allEmpEvents);
  } catch (err) {
    console.log(err);
  }
};

exports.getOneEmpEvents = async (req, res) => {
  try {
    const user = req.user;
    const employeeId = req.params.employeeId;
    const oneEmpData = await EventModel.find({ createdBy: employeeId });
    console.log(oneEmpData);
    res.json(oneEmpData);
  } catch (err) {
    console.log(err);
  }
};

exports.todayEventsOnly = async (req, res) => {
  try {
    const user = req.user;
    let today = new Date();

    const eventsOfToday = await EventModel.find({ startedAt: today }).populate(
      "createdBy"
    );

    console.log(eventsOfToday);

    res.json(eventsOfToday);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const user = req.user;
    const allEmpl = await UserModel.find({
      role: "Employee",
      employeeStatus: "Active",
    });
    console.log(allEmpl);
    res.json(allEmpl);
  } catch (err) {
    console.log(err);
  }
};

exports.getOneEmpData = async (req, res) => {
  try {
    const user = req.user;
    const employeeId = req.params.employeeId;

    const empData = await UserModel.find({ _id: employeeId });
    console.log("empData", empData);
    res.json(empData);
  } catch (err) {
    console.log(err);
  }
};
