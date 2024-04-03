const { Meetings } = require('../models');

async function scheduleMeeting(req, res) {
    const {date, time, facultyId} = req.body;
    try{
        const meeting = await Meetings.create({
            date: date,
            time: time,
            studentId: req.user.id,
            facultyId: facultyId
        });
        res.json(meeting);
    } catch(error){
        res.status(500);
        res.json({Error: "Error Scheduling Meeting"});
    }
};


module.exports = {scheduleMeeting};