const router = require("express").Router();
const auth = require("../Middleware/auth");
const { addMessage, getMessage } = require("../Controller/Chat/message");

router.use(auth);

router.post("/", addMessage);
router.get("/:chatId", getMessage);

module.exports = router;
