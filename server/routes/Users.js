const express = require('express');
const router = express.Router();
const { authRegister } = require('../controllers/Users');


router.post("/register", authRegister);

module.exports = router;