const router = require("express").Router();
const UserModel = require("../Model/user");
const auth = require("../Middleware/auth");

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const user = await UserModel.find({});
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
