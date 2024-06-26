const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


const usersRouter = require("./routes/Users");
app.use("/", usersRouter);

const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

const meetingRouter = require("./routes/Meeting");
app.use("/meetings", meetingRouter);

const rankRouter = require("./routes/Ranks");
app.use("/rank", rankRouter);

const matchesRouter = require("./routes/Matches");
app.use("/matches", matchesRouter);

const adminRouter = require("./routes/Admin");
app.use("/admin", adminRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("HEY FROM SERVER");
  });
});
