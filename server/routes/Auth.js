const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/Auth")


router.post("/login", login);

//weird bug that only allows cookies to be cleared when using a get request
router.get("/logout", logout);





module.exports = router;
