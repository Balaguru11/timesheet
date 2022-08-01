const express = require("express");
const router = express.Router();

const { loginUser, logoutUser } = require("../controllers/authController");

//login and logout for all roles

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

module.exports = router;
