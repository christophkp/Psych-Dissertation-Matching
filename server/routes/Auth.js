const express = require("express");
const router = express.Router();
const { login, logout, getUser, changePass } = require("../controllers/Auth");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", login);

//weird bug that only allows cookies to be cleared when using a get request
router.get("/logout", logout);

router.get("/user", verifyToken, getUser);

router.post("/pass", verifyToken, changePass);

module.exports = router;
