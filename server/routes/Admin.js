const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/Admin");
const verifyToken = require("../middleware/verifyToken");

router.put("/updateuser", verifyToken, updateUser);

module.exports = router;
