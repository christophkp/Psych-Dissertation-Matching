const express = require("express");
const router = express.Router();
const { authRegister, getFaculty } = require("../controllers/Users");
const bcrypt = require("bcrypt");

const { Users } = require("../models");

router.post("/register", authRegister);

router.post("/login", async (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;

  const result = await Users.findOne({
    where: { username: user },
  });
  if (result === null) {
    res.send({ message: "Incorrect Username/Password" });
  } else {
    bcrypt.compare(pass, result.password, (error, response) => {
      if (response) {
        res.send(result);
      } else {
        res.send({ message: "Incorrect Username/Password" });
      }
    });
  }
});

router.get("/faculty", getFaculty);



module.exports = router;
