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
        res.status(200);
        res.json(meeting);
    } catch(error){
        res.status(500);
    }
};


module.exports = {scheduleMeeting};