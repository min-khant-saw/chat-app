const UserModel = require("../../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const passGen = await bcrypt.genSalt(10);
    const hasPass = await bcrypt.hash(password, passGen);
    const user = await UserModel.create({ userName, email, password: hasPass });
    jwt.sign(
      { id: user._id },
      process.env.COOKIE_TOKEN,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) err;
        res
          .cookie("cookie", token, {
            httpOnly: true,
            secure: true,
            maxAge: 2592000000,
          })
          .json(user._id);
      }
    );
  } catch (error) {
    res.json(error);
  }
};

module.exports = register;
