const { Users } = require("../models");
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Users.findOne({
      where: { username: username },
    });
    if (!user) {
      return res.status(401).json({ message: "Incorrect Username/Password" });
    } else {
      const passwordMatch = bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Incorrect Username/Password" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { login };
