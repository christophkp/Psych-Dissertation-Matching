const express = require("express");
const router = express.Router();
const { getMatches } = require("../controllers/Matches");

router.get("/", getMatches);


module.exports = router;
