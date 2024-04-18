const express = require("express");
const router = express.Router();
const { scheduleMeeting, getMeetings } = require("../controllers/Meeting");
const verifyToken = require("../middleware/verifyToken");

router.post('/schedule', verifyToken, scheduleMeeting);

router.get("/", verifyToken, getMeetings);


module.exports = router;
