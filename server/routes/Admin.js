const express = require("express");
const router = express.Router();
const { updateUser, deleteUser, createUser } = require("../controllers/Admin");
const verifyToken = require("../middleware/verifyToken");

router.post("/createuser", verifyToken, createUser);

router.put("/updateuser", verifyToken, updateUser);

router.delete("/deleteuser/:id", verifyToken, deleteUser);

module.exports = router;
