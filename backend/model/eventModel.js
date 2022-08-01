// eventTitle, Event Desc, startedAt, eventStatus, createdBy

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventTitle: { type: "string", required: true },
    eventDesc: { type: "string", required: true },
    startedAt: { type: "date", required: true, default: new Date() },
    eventStatus: {
      type: "string",
      required: true,
      enum: ["Started", "In Progress", "Completed"],
      default: "Started",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
