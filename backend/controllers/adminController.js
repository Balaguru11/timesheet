const bcrypt = require("bcrypt");

// Models
const UserModel = require("../model/userModel");

exports.allEmployees = async (req, res) => {
  try {
    const allEmployees = await UserModel.find();
    console.log(allEmployees);
    res.json(allEmployees);
  } catch (err) {
    console.log(err);
  }
};

exports.addNewEmployee = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    if (!name || !email || !mobile || !password || !role) {
      res.status(400).json({ msg: "Data must be provided in all the fields" });
    }

    // find for duplicate User with email & mobile Number

    const isRegd = await UserModel.findOne({ email: email, mobile: mobile });

    console.log(isRegd);
    if (isRegd) {
      return res.json({
        status: "User_found",
        msg: "User cannot be duplicated",
      });
    }

    // password hasing
    const hashedPassword = bcrypt.hashSync(password, 10);

    const addNew = await UserModel.create({
      name: name,
      email: email,
      mobile: mobile,
      password: hashedPassword,
      role: role,
      employeeStatus: "Active",
    });

    if (addNew) {
      return res.json({
        status: "User_added",
        msg: "A new user has been created successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getOneEmployee = async (req, res) => {
  try {
    const employeeid = req.params.employeeId;
    console.log(employeeid);

    const employeeData = await UserModel.findOne({ _id: employeeid });

    console.log("One Employee", employeeData);
    res.json(employeeData);
  } catch (err) {
    console.log(err);
  }
};

exports.editEmployeeStatus = async (req, res) => {
  try {
    const employeeid = req.params.employeeId;

    const { employeeStatus, role } = req.body;
    console.log(employeeStatus, role);

    const updateEmployee = await UserModel.updateOne(
      { _id: employeeid },
      {
        $set: {
          employeeStatus: employeeStatus,
          role: role,
        },
      }
    );

    console.log(updateEmployee);
    res.json(updateEmployee);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAnEmployee = async (req, res) => {
  try {
    const employeeid = req.params.employeeId;
    const deleteUser = await UserModel.deleteOne({ _id: employeeid });
    console.log(deleteUser);
    res.json(deleteUser);
  } catch (err) {
    console.log(err);
  }
};
