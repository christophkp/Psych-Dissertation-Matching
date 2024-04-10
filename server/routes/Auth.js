const express = require("express");
const router = express.Router();
const { login, logout, getUser } = require("../controllers/Auth");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", login);

//weird bug that only allows cookies to be cleared when using a get request
router.get("/logout", logout);

router.get("/user", verifyToken, getUser);

module.exports = router;
