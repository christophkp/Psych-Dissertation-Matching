const { Users } = require("../models");
const bcrypt = require("bcrypt");

async function authRegister(req, res) {
  const { firstName, lastName, username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username: username } });
    if (user) {
      res.status(400);
      return res.json({ Error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
    });
    res.json({ User: "User Registered Successfully" });
  } catch (err) {
    res.status(500);
    res.json({ Error: "Error Registering User" });
  }
}

async function getFaculty(req, res) {
  try {
    const faculty = await Users.findAll({ where: { role: "faculty" } });
    res.json(faculty);
  } catch (err) {
    res.status(500);
    res.json({ Error: "Error Retrieving Faculty" });
  }
}

async function update(req, res) {
  const userID = req.params.id;
  try {
    const user = await Users.findByPk(userID);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    } else {
      user.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        information: req.body.information,
        research: req.body.research,
      });

      await user.save();
      res.json({message: "Update successful"});
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
}

module.exports = { authRegister, getFaculty, update };
