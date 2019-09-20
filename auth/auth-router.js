const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Auth = require("./auth-model.js");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Auth.addUser(user)
    .then(test => {
      const token = Auth.generateToken(user);
      res.status(201).json({ ...test, token });
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(400).json({ message: "Username already exists." });
      } else {
        res.status(500).json({
          message: "Error occurred while registering a user.",
          err: err
        });
      }
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Auth.findUserBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = Auth.generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error occurred while logging in." });
    });
});

module.exports = router;
