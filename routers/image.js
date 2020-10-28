const express = require("express");
const { Router } = express;
const Image = require("../models").image;
const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    if (!images) {
      return res.status(400).json("No images found.");
    }
    res.json(images.map((image) => image));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
