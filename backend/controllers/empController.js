// Models
const EventModel = require("../model/eventModel");
const EmployeeModel = require("../model/userModel");

exports.allMyEvents = async (req, res) => {
  const user = req.user;
  try {
    const myEvents = await EventModel.find({
      createdBy: user._id,
    });

    res.json(myEvents);
  } catch (err) {
    console.log(err);
  }
};

exports.addNewEvent = async (req, res) => {
  try {
    const user = req.user;
    const { eventTitle, eventDesc } = req.body;

    if (!eventTitle || !eventDesc) {
      return res
        .status(400)
        .json({ msg: "Event title or Description is left blank" });
    }

    const newEvent = await EventModel.create({
      eventTitle: eventTitle,
      eventDesc: eventDesc,
      // startedAt: new Date(),
      // eventStatus:
      createdBy: user.user_id,
    });

    console.log(newEvent);
    res.json(newEvent);
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleEvent = async (req, res) => {
  try {
    const user = req.user;
    const eventId = req.params.eventId;

    const eventDetails = await EventModel.find({
      _id: eventId,
      createdBy: user.user_id,
    });

    res.json(eventDetails);
  } catch (err) {
    console.log(err);
  }
};

exports.editAnEvent = async (req, res) => {
  try {
    const user = req.user;
    const eventId = req.params.eventId;

    const { eventTitle, eventDesc } = req.body;

    if (!eventTitle || !eventDesc) {
      return res
        .statu(400)
        .json({ msg: "Event title / description cannot be empty" });
    }

    const updateEvent = await EventModel.updateOne(
      {
        _id: eventId,
        createdBy: user.user_id,
      },
      {
        $set: {
          eventTitle: eventTitle,
          eventDesc: eventDesc,
        },
      }
    );

    console.log("Update Event", updateEvent);

    res.json(updateEvent);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAnEvent = async (req, res) => {
  try {
    const user = req.user;
    const eventId = req.params.eventId;

    const deleteEvent = await EventModel.deleteOne({
      _id: eventId,
      createdBy: user.user_id,
    });

    console.log("deleted Event", deleteEvent);
    res.json(deleteEvent);
  } catch (err) {
    console.log(err);
  }
};
