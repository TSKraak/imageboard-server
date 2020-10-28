const express = require("express");
const { Router } = express;
const User = require("../models").user;

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

module.exports = router;
