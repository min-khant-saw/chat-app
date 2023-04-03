const router = require("express").Router();
const register = require("../Controller/Auth/register");
const login = require("../Controller/Auth/login");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
