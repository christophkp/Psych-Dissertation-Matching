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
    const user = await Users.findByPk(id, {
      include: Meetings,
    });
    const meetings = user.Meetings;
    console.log(meetings)
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: "Could not retreive meetings" });
  }
}


async function getMeetingsByRole(req, res) {
  try {
    const id = req.user.id;
    const user = await Users.findByPk(id);
    let meetings;
  
    if (user.role === 'student') {
      meetings = await Meetings.findAll({ where: { studentId: id } });
      for (let i = 0; i < meetings.length; i++) {
        const meeting = meetings[i];
        const meetingData = meeting.toJSON(); 
        const facultyUser = await Users.findByPk(meeting.facultyId);
        meetingData.faculty = facultyUser;
        meetings[i] = meetingData;
      }
    } else if (user.role === 'faculty') {
      meetings = await Meetings.findAll({ where: { facultyId: id } });
      for (let i = 0; i < meetings.length; i++) {
        const meeting = meetings[i];
        const meetingData = meeting.toJSON(); 
        const studentUser = await Users.findByPk(meeting.studentId);
        meetingData.student = studentUser;
        meetings[i] = meetingData;
      }
    }
    
    res.status(200).json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not retrieve meetings" });
  }
}

async function acceptMeeting(req, res) {
  const { meetingId } = req.body;

  try {
    const meeting = await Meetings.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    await meeting.update({ status: "Accepted" });

    res.status(200).json({ message: "Meeting accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to accept meeting" });
  }
}

async function declineMeeting(req, res) {
  const { meetingId } = req.body;

  try {
    const meeting = await Meetings.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    await meeting.update({ status: "Declined" });

    res.status(200).json({ message: "Meeting declined successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to decline meeting" });
  }
}

module.exports = { scheduleMeeting, getMeetings, getMeetingsByRole, acceptMeeting, declineMeeting };