const express = require("express");
const router = express.Router();
const { scheduleMeeting, getMeetings, getMeetingsByRole, acceptMeeting, declineMeeting } = require("../controllers/Meeting");
const verifyToken = require("../middleware/verifyToken");

router.post('/schedule', verifyToken, scheduleMeeting);

router.get("/", verifyToken, getMeetings);

router.get("/byRole", verifyToken, getMeetingsByRole);

router.put("/accept", verifyToken, acceptMeeting);

router.put("/decline", verifyToken, declineMeeting);


module.exports = router;
