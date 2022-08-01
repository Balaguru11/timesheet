const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true, lowercase: true },
    mobile: {
      type: "Number",
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 10,
    },
    password: { type: "string", required: true, minLength: 8 },
    role: {
      type: "string",
      required: true,
      enum: ["Employee", "Manager"],
      default: "Employee",
    },
    employeeStatus: {
      type: "string",
      required: true,
      enum: ["Active", "Inactive"],
    },
    refreshToken: { type: "string", default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
