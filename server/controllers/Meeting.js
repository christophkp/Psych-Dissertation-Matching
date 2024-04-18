const { Meetings } = require("../models");
const { Users } = require("../models");

async function scheduleMeeting(req, res) {
  const { startDate, endDate, facultyId } = req.body;
  try {
    const meeting = await Meetings.create({
      startDate,
      endDate,
      studentId: req.user.id,
      facultyId,
    });
    res.status(200);
    res.json(meeting);
  } catch (error) {
    res.status(500);
  }
}

async function getMeetings(req, res) {
  try {
    const id = req.user.id;
    const user = await Users.findByPk(id);
    const meetings = await user.getMeetings();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: "Could not retreive meetings" });
  }
}

module.exports = { scheduleMeeting, getMeetings };
