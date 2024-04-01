const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const usersRouter = require("./routes/Users");
app.use("/", usersRouter);

const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("HEY FROM SERVER");
  });
});
