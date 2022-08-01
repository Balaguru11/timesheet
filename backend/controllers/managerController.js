exports.getAllEmpEvengts = async (req, res) => {
  try {
    const user = req.user;
    const allEmpEvents = await EventModel.find({});
    console.log(allEmpEvents);
  } catch (err) {
    console.log(err);
  }
};

exports.todayEventsOnly = async (req, res) => {
  try {
    const user = req.user;
    let today = new Date();

    const eventsOfToday = await EventModel.find({ startedAt: today });

    console.log(eventsOfToday);

    res.json(eventsOfToday);
  } catch (err) {
    console.log(err);
  }
};
