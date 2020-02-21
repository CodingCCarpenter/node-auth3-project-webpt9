const jwt = require("jsonwebtoken");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        res.status(403).json({ message: "I'm sorry, but you are not authorized!" });
      } else {
        req.userId = payload.userId;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials prodived." });
  }
};

module.exports = { restricted };