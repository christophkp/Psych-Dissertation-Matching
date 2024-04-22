const express = require("express");
const router = express.Router();
const { submitRanking, rankSubmitted } = require("../controllers/Rank");
const verifyToken = require("../middleware/verifyToken");

router.post('/submit', verifyToken, submitRanking);

router.get('/isSubmitted', verifyToken, rankSubmitted);

module.exports = router;
