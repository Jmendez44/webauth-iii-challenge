const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "Your token is garbage"
        });
      } else {
        req.decodedJwt = decodedToken;
        console.log("decoded token", req.decodedJwt);
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "Get out of here. Only people with tokens are allowed in."
    });
  }
};
