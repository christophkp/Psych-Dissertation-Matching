const express = require("express");
const router = express.Router();
const { submitRanking, rankSubmitted, getStudentRankings } = require("../controllers/Rank");
const verifyToken = require("../middleware/verifyToken");

router.post('/submit', verifyToken, submitRanking);

router.get('/isSubmitted', verifyToken, rankSubmitted);

router.get("/studentrankings", verifyToken, getStudentRankings);


module.exports = router;
