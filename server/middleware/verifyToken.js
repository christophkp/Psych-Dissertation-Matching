const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  //console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Not Logged In!" });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        req.user = decoded;
       // console.log(req.user.id);
        next();
      }
    });
  }
};

module.exports = verifyToken;
