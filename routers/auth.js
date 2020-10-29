const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Please supply a valid email and password",
    });
  }
  // normally we would check the password and find the correct user in the database
  res.send({
    jwt: toJWT({ userId: 1 }),
  });
});

module.exports = router;
