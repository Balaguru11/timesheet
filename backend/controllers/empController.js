// Models
const EventModel = require("../model/eventModel");
const EmployeeModel = require("../model/userModel");

exports.allMyEvents = async (req, res) => {
  const user = req.user;
  console.log(user);
  try {
    const myEvents = await EventModel.find({
      createdBy: user.user_id,
    });
    console.log(myEvents);
    res.json(myEvents);
  } catch (err) {
    console.log(err);
  }
};

exports.addNewEvent = async (req, res) => {
  try {
    const user = req.user;
    const { title, notes, startDate, endDate, allDay } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const newEvent = await EventModel.create({
      title: title,
      notes: notes,
      startDate: startDate,
      endDate: endDate,
      allDay: allDay,
      eventStatus: "Started",
      createdBy: user.user_id,
    });

    res.json(newEvent);

    // const { eventTitle, evetDesc, endDate } = req.body;

    // if (!title || !endDate || !startDate) {
    //   return res.status(400).json({ msg: "All fields required" });
    // }

    // const newEvent = await EventModel.create({
    //   eventTitle: eventTitle,
    //   evetDesc: evetDesc,
    //   startDate: new Date(),
    //   endDate: endDate,
    //   eventStatus: "Started",
    //   createdBy: user.user_id,
    // });

    // res.json(newEvent);
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

    // const { eventTitle, eventDesc, endDate } = req.body;
    // const updateEvent = await EventModel.updateOne(
    //   {
    //     _id: eventId,
    //     createdBy: user.user_id,
    //   },
    //   {
    //     $set: {
    //       eventTitle: eventTitle,
    //       eventDesc: eventDesc,
    //       endDate: endDate,
    //     },
    //   }
    // );
    // console.log("Update Event", updateEvent);
    // res.json(updateEvent);

    const { title, notes, startDate, endDate, allDay } = req.body;

    if (!title || !endDate || !startDate) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const updateEvent = await EventModel.updateOne(
      {
        _id: eventId,
        createdBy: user.user_id,
      },
      {
        $set: {
          title: title,
          notes: notes,
          startDate: startDate,
          endDate: endDate,
          allDay: allDay,
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

    // const today = new Date();
    // const eventData = await EventModel.fineOne({ _id: eventId });

    // if (eventData && eventData?.startDate < today) {
    const deleteEvent = await EventModel.deleteOne({
      _id: eventId,
      createdBy: user.user_id,
    });

    console.log("deleted Event", deleteEvent);
    res.json(deleteEvent);
    // }
    // res.json({ ststus: "event_error", msg: "Event couldnot be deleted" });
  } catch (err) {
    console.log(err);
  }
};
