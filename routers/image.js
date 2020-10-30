const express = require("express");
const { Router } = express;
const Image = require("../models").image;
// const { toJWT, toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");

const router = new Router();

// Get all images without authorization
router.get("/", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 100);
  const offset = req.query.offset || 0;

  try {
    const images = await Image.findAndCountAll({ limit, offset });
    // console.log("IMAGES", images);
    if (images.rows.length === 0) {
      return res.status(404).json("No images found.");
    }
    res.send({ images: images.rows, total: images.count });
  } catch (error) {
    next(error);
  }
});

// Get all images THROUGH authorization
router.get("/auth", authMiddleware, async (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 100);
  const offset = req.query.offset || 0;

  try {
    const images = await Image.findAndCountAll({ limit, offset });
    // console.log("IMAGES", images);
    if (images.rows.length === 0) {
      return res.status(404).json("No images found.");
    }
    res.send({ images: images.rows, total: images.count });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      return res.status(400).json("Missing parameters.");
    }
    const newImage = await Image.create({ title, url });
    res.json("Image added.");
  } catch (error) {
    next(error);
  }
});

router.get("/:imageId", async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const image = await Image.findByPk(imageId);
    if (!image) {
      return res.status(404).json("No image found with that ID.");
    }
    res.json(image);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
