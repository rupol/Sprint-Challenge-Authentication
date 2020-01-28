const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("./authenticate-middleware");
const usersModel = require("./users-model");
const secrets = require("../config/secrets");

const router = require("express").Router();

router.post("/register", validateUser, async (req, res, next) => {
  // implement registration
  try {
    const user = await usersModel.add(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/login", validateUser, async (req, res, next) => {
  // implement login
  try {
    const { username, password } = req.body;
    const user = await usersModel.getBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const token = signToken(user);

      res.status(200).json({
        message: "Successfully logged in",
        user: user.id,
        token
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials, please check your username and password"
      });
    }
  } catch (error) {
    next(error);
  }
});

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = secrets.jwt;

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, secret, options);
}

function validateUser(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "missing user data" });
  } else if (!req.body.username) {
    return res.status(400).json({ message: "missing required username field" });
  } else if (!req.body.password) {
    return res.status(400).json({ message: "missing required password field" });
  }
  next();
}

module.exports = router;
