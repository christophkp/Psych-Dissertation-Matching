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
    information,
    research,
  } = req.body;
  try {
    const user = await Users.findByPk(id);
    console.log("TEST" + user);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (password != "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (role === "student")
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

module.exports = { updateUser };
