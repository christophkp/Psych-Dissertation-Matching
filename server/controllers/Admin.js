const { Users } = require("../models");
const bcrypt = require("bcrypt");

async function updateUser(req, res) {
  const {
    id,
    firstName,
    lastName,
    username,
    password,
    role,
    numStudents,
    information,
    research,
  } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (password != "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (username !== user.username) {
      const existingUser = await Users.findOne({
        where: { username: username },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Email already taken" });
      }
    }

    if (role === "student" || "admin")
      user.set({
        firstName,
        lastName,
        username,
        role,
      });
    if (role === "faculty") {
      user.set({
        firstName,
        lastName,
        username,
        role,
        numStudents,
        information,
        research,
      });
    }

    await user.save();
    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
}

async function deleteUser(req, res) {
  const userID = req.params.id;
  try {
    const user = await Users.findByPk(userID);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    await user.destroy();
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
}

async function createUser(req, res) {
  const {
    firstName,
    lastName,
    username,
    password,
    role,
    numStudents,
    information,
    research,
  } = req.body;
  try {
    const existingUser = await Users.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role,
    };

    if (role === "faculty") {
      userData.numStudents = numStudents;
      userData.information = information;
      userData.research = research;
    }
    await Users.create(userData);

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
}

module.exports = { updateUser, deleteUser, createUser };
