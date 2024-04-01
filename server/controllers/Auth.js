const jwt = require("jsonwebtoken");
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
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        //move secret to env file later
        const token = jwt.sign({ id: user.id }, "jwtSecret");

        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 30 * 86400000,
          })
          .status(200)
          .json({ username: user.username });
      } else {
        return res.status(401).json({ message: "Incorrect Username/Password" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { login };
