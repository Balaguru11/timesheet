const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authFromHeader = req.headers.authorization || req.headers.Authorization;

  if (
    authFromHeader === undefined ||
    authFromHeader.split(" ")[0] !== "Bearer"
  ) {
    res.sendStatus(403);
  }

  const authToken = authFromHeader.split(" ")[1];

  jwt.verify(authToken, process.env.ACCESS_TOKEN_KEY, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    }
    req.user = foundUser;
    next();
  });
};
