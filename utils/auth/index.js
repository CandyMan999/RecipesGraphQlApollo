const jwt = require("jsonwebtoken");

const createToken = id =>
  jwt.sign({ id }, process.env.SECRET || "supersecret", { expiresIn: "14d" });

module.exports = {
  createToken
};
