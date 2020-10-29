const express = require("express");
const { Router } = express;
const User = require("../models").user;
const bcrypt = require("bcrypt");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(400).json("No users found");
    }
    res.json(users.map((user) => user));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      req
        .status(400)
        .json("Missing parameters, please enter name, email & password.");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      fullName: name,
      email,
      password: hashedPassword,
    });
    // res.json(`New user added: ${name}, ${email}`);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
