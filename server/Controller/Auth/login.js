const UserModel = require("../../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    const hasPass = bcrypt.compareSync(password, user.password);
    if (hasPass) {
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
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = login;
