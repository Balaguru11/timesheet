const express = require("express");
const adminRouter = express.Router();

//admin can see all the employees
// admin will add new employee (employee and Manager)
// admin will change the employee status
// admin can delete employee if neeeded

const {
  allEmployees,
  addNewEmployee,
  getOneEmployee,
  editEmployeeStatus,
  deleteAnEmployee,
} = require("../../controllers/adminController");

const { isAdmin } = require("../../middlewares/matchRole");

adminRouter.use(isAdmin);

adminRouter.route("/employees").get(allEmployees).post(addNewEmployee);

adminRouter
  .route("/employee/:employeeId")
  .get(getOneEmployee)
  .put(editEmployeeStatus)
  .delete(deleteAnEmployee);

module.exports = adminRouter;
