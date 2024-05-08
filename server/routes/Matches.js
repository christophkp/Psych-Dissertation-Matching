const express = require("express");
const router = express.Router();
const { generateMatches } = require("../controllers/Matches");

router.get("/", generateMatches);


module.exports = router;
