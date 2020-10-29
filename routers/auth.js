const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Please supply a valid email and password",
    });
  }
  // 1. find user based on email address
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).send({
      message: "User with that email does not exist",
    });
  }
  // 2. use bcrypt.compareSync to check the received password against the stored hash
  if (bcrypt.compareSync(password, user.password)) {
    // 3. if the password is correct, return a JWT with the userId of the user (user.id)
    const jwt = toJWT({ userId: user.id });
    return res.json(`Welcome ${user.fullName}`);
  }
  res.status(400).json("Password was incorrect");
});

module.exports = router;
