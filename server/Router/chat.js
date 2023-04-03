const router = require("express").Router();
const { createChat, userChats, findChat } = require("../Controller/Chat/chat");
const auth = require("../Middleware/auth");

router.use(auth);
router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/:firstId/:secondId", findChat);

module.exports = router;
