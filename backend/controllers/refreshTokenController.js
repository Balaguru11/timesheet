const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
const AdminModel = require("../model/adminModel");

exports.handleRefreshToken = async (req, res) => {
  const refreshToken = req.headers.refresh;
  if (!refreshToken) return res.sendStatus(401); // unauthorized

  const foundUser =
    (await UserModel.findOne({ refreshToken })) ||
    (await AdminModel.findOne({ refreshToken }));

  if (!foundUser) {
    return res.sendStatus(401);
  }

  const foundUser_id = foundUser._id.toString();

  try {
    jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(401); //401
      } else if (foundUser_id !== decoded.user_id) {
        return res.sendStatus(401); //unauthorized
      }
      const accessToken = jwt.sign(
        {
          user_id: decoded.user_id,
          email: decoded.email,
          role: decoded.role,
          employeeStatus: decoded.employeeStatus || "Active",
        },
        process.env.TOKEN_KEY,
        { expiresIn: "20m" }
      );
      return res.json({ accessToken });
    });
  } catch (err) {
    console.log(err);
  }
};
