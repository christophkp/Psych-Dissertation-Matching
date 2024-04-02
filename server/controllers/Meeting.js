const { Meetings } = require('../models');

async function scheduleMeeting(req, res) {
    const {date, facultyId} = req.body;
    try{
        const meeting = await Meetings.create({
            date: date,
            studentId: 4,
            facultyId: facultyId
        });
        res.json(meeting);
    } catch(error){
        res.status(500);
        res.json({Error: error});
    }
};


module.exports = {scheduleMeeting};