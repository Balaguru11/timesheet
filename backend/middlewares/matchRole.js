exports.isEmployee = (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "Employee") {
      return res.json({
        status: "authority_error",
        msg: "You are not authorized to do this action.",
      });
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.isManager = (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "Manager") {
      return res.json({
        status: "authority_error",
        msg: "You are not authorized to do this action.",
      });
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
