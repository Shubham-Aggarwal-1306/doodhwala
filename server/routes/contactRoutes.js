const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");
const { checkAuth } = require("../middlewares/authMiddleware");
const { adminAuth } = require("../middlewares/adminAuthMiddleware");

router.post("/sendmessage", checkAuth, contactController.sendMessage);
router.get("/getall", adminAuth, contactController.getAllMessages);
router.get("/getbyuser/:userID", contactController.getMessageOfUser);

module.exports = router;
