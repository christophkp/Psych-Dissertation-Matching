const express = require("express");
const router = express.Router();
const { scheduleMeeting } = require("../controllers/Meeting");
const verifyToken = require("../middleware/verifyToken");

router.post('/schedule', verifyToken, scheduleMeeting);


module.exports = router;
