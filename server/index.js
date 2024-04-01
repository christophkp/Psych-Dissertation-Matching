const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use(cookieParser());


const usersRouter = require("./routes/Users");
app.use("/", usersRouter);

const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

const meetingRouter = require("./routes/Meeting");
app.use("/meetings", meetingRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("HEY FROM SERVER");
  });
});
