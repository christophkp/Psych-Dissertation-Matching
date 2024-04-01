const express = require("express");
const router = express.Router();
const { authRegister, getFaculty } = require("../controllers/Users");
const bcrypt = require("bcrypt");

const { Users } = require("../models");

router.post("/register", authRegister);


router.get("/faculty", getFaculty);

module.exports = router;
