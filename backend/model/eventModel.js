// eventTitle, Event Desc, startedAt, eventStatus, createdBy

const mongoose = require("mongoose");

// const eventSchema = new mongoose.Schema(
//   {
//     eventTitle: { type: String, required: true },
//     eventDesc: { type: String, required: true },
//     startDate: { type: Date, required: true, default: new Date() },
//     endDate: { type: Date, required: true },
//     eventStatus: {
//       type: String,
//       required: true,
//       enum: ["Started", "In Progress", "Completed"],
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    allDay: { type: String },
    notes: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    eventStatus: {
      type: String,
      required: true,
      enum: ["Started", "In Progress", "Completed"],
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
