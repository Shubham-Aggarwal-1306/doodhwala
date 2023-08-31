const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const { checkAuth } = require("../middlewares/authMiddleware");
const { adminAuth } = require("../middlewares/adminAuthMiddleware");

router.post("/addUser", checkAuth, userController.addUser);
router.get("/getAllUsers", adminAuth, userController.getAllUsers);
router.get("/stats", adminAuth, userController.getUserStats);
router.get("/:userID", adminAuth, userController.getUser);

module.exports = router;
