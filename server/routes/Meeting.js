const express = require("express");
const router = express.Router();
const { scheduleMeeting } = require("../controllers/Meeting")

router.post('/schedule', scheduleMeeting);


module.exports = router;
