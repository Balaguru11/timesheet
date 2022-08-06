const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Models
const UserModel = require("../model/userModel");
const EventModel = require("../model/eventModel");
const AdminModel = require("../model/adminModel");

// exports.adminLogin = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400);
//   }

//   const checkAdmin = await AdminModel.find({ email: email, role: "Admin" });

//   if (checkAdmin) {
//     return res.json({
//       status: "duplicate_admin",
//       msg: ".",
//     });
//   }

//   // const newAdmin = await AdminModel.create({
//   //   email: email,
//   //   password: password,
//   // });

// };

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    let isUser = await UserModel.findOne({ email: email });

    console.log(isUser);

    if (!isUser) {
      return res.sendStatus(401); //Unauthorized
    }

    const pwdCheck = bcrypt.compareSync(password, isUser.password);
    if (!pwdCheck) {
      return res.status(401).json({
        status: "login_failed",
        msg: "Password doesnot match",
      });
    }

    const accessToken = jwt.sign(
      {
        user_id: isUser._id,
        email: isUser.email,
        role: isUser.role,
        employeeStatus: isUser.employeeStatus,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "60m",
      }
    );

    const refreshToken = jwt.sign(
      {
        user_id: isUser._id,
        email: isUser.email,
        role: isUser.role,
        employeeStatus: isUser.employeeStatus,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "90m",
      }
    );
    isUser.refreshToken = refreshToken;
    const updateCurrentUser = await isUser.save();

    if (updateCurrentUser) {
      res.json({
        user_id: isUser._id,
        accessToken,
        refreshToken,
        role: isUser.role,
        employeeStatus: isUser.employeeStatus,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.logoutUser = async (req, res) => {
  const accessToken = req.headers.accessToken;
  if (!accessToken) return res.sendStatus(204);
  const refreshToken = req.headers.refresh;

  const foundUser =
    (await UserModel.findOne({ refreshToken })) ||
    (await AdminModel.findOne({ refreshToken }));

  if (!foundUser) {
    req.headers.accessToken = "";
    return res.sendStatus(204);
  }

  // If foundUser & delete refresh token in the database
  if (foundUser.role !== "admin") {
    await UserModel.findOneAndUpdate(
      { _id: foundUser._id },
      { $set: { refreshToken: "" } }
    );
    req.headers.accessToken = "";
    res.status(200).send("Logged Out & cleared");
  }
  await AdminModel.findOneAndUpdate(
    { _id: foundUser._id },
    { $set: { refreshToken: "" } }
  );

  req.headers.accessToken = "";
  res.status(200).send("Logged Out & cleared");
};

exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400);
    }

    const findAdmin = await AdminModel.findOne({ email: email });
    if (findAdmin) {
      return res.json({
        status: "admin_found",
        msg: "An admin with the same email already exists",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = await AdminModel.create({
      email: email,
      password: hashedPassword,
    });

    if (newAdmin) {
      return res.json({
        status: "Admin_success",
        msg: "Admin account successfully created",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    let isUser = await AdminModel.findOne({ email: email });

    console.log(isUser);

    if (!isUser) {
      return res.sendStatus(401); //Unauthorized
    }

    const pwdCheck = bcrypt.compareSync(password, isUser.password);
    if (!pwdCheck) {
      return res.status(401).json({
        status: "login_failed",
        msg: "Password doesnot match",
      });
    }

    const accessToken = jwt.sign(
      {
        user_id: isUser._id,
        email: isUser.email,
        role: "Admin",
        employeeStatus: "Active",
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "60m",
      }
    );

    const refreshToken = jwt.sign(
      {
        user_id: isUser._id,
        email: isUser.email,
        role: "Admin",
        employeeStatus: "Active",
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "90m",
      }
    );

    isUser.refreshToken = refreshToken;
    const updateCurrentUser = await isUser.save();

    if (updateCurrentUser) {
      res.json({
        user_id: isUser._id,
        accessToken,
        refreshToken,
        role: "Admin",
        employeeStatus: "Active",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
