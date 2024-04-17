const express = require("express");
const router = express.Router();
const { authRegister, getFaculty, update, getStudents } = require("../controllers/Users");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/assets/profilepics");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/register", authRegister);

router.get("/faculty", verifyToken, getFaculty);

router.get("/students", verifyToken, getStudents);


router.put("/update/:id", upload.single("profilepic"), update);

module.exports = router;
