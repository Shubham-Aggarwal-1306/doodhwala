const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const { checkAuth } = require("../middlewares/authMiddleware");

router.get("/get", checkAuth, cartController.getCart);
router.post("/add", checkAuth, cartController.addToCart);
router.post("/remove", checkAuth, cartController.removeFromCart);

module.exports = router;
