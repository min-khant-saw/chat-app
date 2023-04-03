const router = require("express").Router();
const auth = require("../Middleware/auth");

router.use(auth);

router.get("/", (req, res) => {
  res.json(res.locals.userId);
});

module.exports = router;
