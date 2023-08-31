const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const { checkAuth } = require("../middlewares/authMiddleware");
const { adminAuth } = require("../middlewares/adminAuthMiddleware");

router.post("/checkout", checkAuth, orderController.checkout);
router.post("/approve/:orderID", adminAuth, orderController.approveOrder);
router.post("/complete/:orderID", adminAuth, orderController.completeOrder);
router.post("/cancel/:orderID", adminAuth, orderController.cancelOrder);

router.post("/vacation", checkAuth, orderController.addVacation);

router.get("/userorders", checkAuth, orderController.getOrdersOfUser);
router.get("/activeservices", checkAuth, orderController.getActiveServices);

router.get("/stats", adminAuth, orderController.getOrderStats);

router.get("/", adminAuth, orderController.getAllOrders);
router.get("/:orderID", adminAuth, orderController.getOrder);

module.exports = router;
