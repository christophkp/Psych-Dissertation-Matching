const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

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
    const faculty = await Users.findAll({ where: { role: "student" } });
    res.json(faculty);
  } catch (err) {
    res.status(500);
    res.json({ Error: "Error Retrieving Faculty" });
  }
}

async function update(req, res) {
  const userID = req.params.id;
  const image = req.file?.filename;
  try {
    const user = await Users.findByPk(userID);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    } else {
      if (user.role === "student" || user.role === "admin") {
        console.log(user.role);
        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
        });
      } else if (user.role === "faculty") {
        const updatedFields = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          information: req.body.information,
          research: req.body.research,
        };
        if (image) {
          updatedFields.profilepic = image;
        }
        user.set(updatedFields);
      }

      await user.save();
      res.status(200).json({ message: "Profile Updated Successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
}

async function getUsers(req, res) {
  try {
    const id = req.user.id;
    const user = await Users.findByPk(id);
    const users = await Users.findAll({
      where: {
        [Op.or]: [{ role: "student" }, { role: "faculty" }],
      },
      order: [["id", "ASC"]],
    });

    if (user.role === "admin") {
      return res.status(200).json(users);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Getting Users" });
  }
}

module.exports = { authRegister, getFaculty, update, getUsers };