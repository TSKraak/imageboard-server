const User = require("../models").user;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  // 1. check for authorization header and "split" it.
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  // 2. if authorization header is there, auth type is Bearer and we have something at auth[1] we proceed to check the token.
  if (auth && auth[0] === "Bearer" && auth[1]) {
    //    Remember to try/catch the call to "toData()".
    try {
      const data = toData(auth[1]);
      // 3. Use the value returned from "toData()" to look for that user in your database with User.findByPk
      const user = await User.findByPk(data.userId);
      // 4. If not found, set status to 404 "no user found";
      //   console.log("USER", user);
      if (!user) {
        return res.status(404).json("User not found");
      }
      // 5. If user is found, set it to `req.user = user` and call next();
      req.user = user;
      next();
    } catch (error) {
      console.log(`Error ${error.name}: ${error.message}`);
      return res.status(400).send("Invalid JWT token");
    }
  } else {
    //    If no authorization header is supplied, we return a 401 status and the message: 'Please supply some valid credentials
    return res.status(401).json("Please supply some valid credentials");
  }
}

module.exports = auth;
