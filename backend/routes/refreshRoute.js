const express = require("express");
const refreshRouter = express.Router();
const { handleRefreshToken } = require("../controllers/refreshTokenController");

refreshRouter.get("/", handleRefreshToken);

module.exports = refreshRouter;
