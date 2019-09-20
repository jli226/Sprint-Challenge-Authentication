const db = require("../database/dbConfig.js");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = {
  addUser,
  findUserBy,
  generateToken
};

function getUser() {
  return db("users");
}

async function addUser(user) {
  const [id] = await db("users").insert(user);

  return findUserById(id).select("id", "username");
}

function findUserBy(user) {
  return db("users").where(user);
}

function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}
