const express = require("express");
const router = express.Router();

const {
  loginUser,
  logoutUser,
  createAdmin,
  adminLogin,
} = require("../controllers/authController");

//login and logout for all roles

router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/create-admin").post(createAdmin);
router.route("/admin-login").post(adminLogin);

module.exports = router;
