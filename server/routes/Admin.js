const express = require("express");
const router = express.Router();
const { updateUser, deleteUser } = require("../controllers/Admin");
const verifyToken = require("../middleware/verifyToken");

router.put("/updateuser", verifyToken, updateUser);

router.delete("/deleteuser/:id", verifyToken, deleteUser);

module.exports = router;
