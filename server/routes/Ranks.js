const express = require("express");
const router = express.Router();
const { submitRanking } = require("../controllers/Rank");
const verifyToken = require("../middleware/verifyToken");

router.post('/submit', verifyToken, submitRanking);


module.exports = router;
