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
         const userData = {
           id: user.id,
           firstName: user.firstName,
           lastName: user.lastName,
           username: user.username,
           role: user.role,
           numStudents: user.numStudents,
           information: user.information,
           research: user.research,
           profilepic: user.profilepic,
           createdAt: user.createdAt,
           meetingLink: user.meetingLink,
         };
        res
          .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 30 * 86400000,
            secure: true,
            path: "/",
          })
          .status(200)
          .json({ userData });
      } else {
        return res.status(401).json({ message: "Incorrect Username/Password" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logout(req, res) {
  try {
    res
      .clearCookie("access_token", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "User logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Error during logout" });
  }
}

async function getUser(req, res) {
  try {
    const id = req.user.id;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
      numStudents: user.numStudents,
      information: user.information,
      research: user.research,
      profilepic: user.profilepic,
      createdAt: user.createdAt,
      meetingLink: user.meetingLink,
    };
    res.status(200).json({ userData });
  } catch (error) {
    return res.status(500).json({ message: "Error geting user" });
  }
}

async function changePass(req, res) {
  try {
    const id = req.user.id;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const user = await Users.findByPk(id);

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (passwordMatch) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedNewPassword });
      await user.save();
      return res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      return res.status(401).json({ message: "Current Password Is Incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Changing Password" });
  }
}

module.exports = { login, logout, getUser, changePass };
