const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { authRegister } = require('../controllers/Users');


router.post("/register", authRegister);

module.exports = router;