const express = require("express");
const { Router } = express;
const Image = require("../models").image;
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.get("/", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 100);
  const offset = req.query.offset || 0;

  Image.findAndCountAll({ limit, offset })
    .then((result) => res.send({ images: result.rows, total: result.count }))
    .catch((error) => next(error));
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

router.get("/auth/messy", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 100);
  const offset = req.query.offset || 0;

  Image.findAndCountAll({ limit, offset })
    .then((result) => res.send({ images: result.rows, total: result.count }))
    .catch((error) => next(error));

  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
    const allImages = await Image.findAll();
    res.json(allImages);
  } else {
    try {
      const images = await Image.findAll();
      if (!images) {
        return res.status(400).json("No images found.");
      }
      res.json(images.map((image) => image));
    } catch (error) {
      next(error);
    }
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
