const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const cookie = req?.cookies.cookie;
  try {
    if (cookie) {
      jwt.verify(cookie, process.env.COOKIE_TOKEN, {}, (err, userId) => {
        if (err) throw err;
        res.locals.userId = userId.id; // set the user ID in locals
        next();
      });
    } else {
      res.status(401).json("No Cookie");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
