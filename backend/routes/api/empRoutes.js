const express = require("express");
const router = express.Router();
const { isEmployee } = require("../../middlewares/matchRole");

const {
  allMyEvents,
  getSingleEvent,
  addNewEvent,
  editAnEvent,
  deleteAnEvent,
} = require("../../controllers/empController");

router.use(isEmployee);

router.route("/events").get(allMyEvents).post(addNewEvent);

router
  .route("/event/:eventId")
  .get(getSingleEvent)
  .put(editAnEvent)
  .delete(deleteAnEvent);

// CRUD Event,

module.exports = router;
