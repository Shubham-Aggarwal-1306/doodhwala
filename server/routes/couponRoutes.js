const express = require("express");
const router = express.Router();

const couponController = require("../controllers/couponController");
const { checkAuth } = require("../middlewares/authMiddleware");
const { adminAuth } = require("../middlewares/adminAuthMiddleware");

router.post("/generate", adminAuth, couponController.generateCoupon);
router.get("/all", adminAuth, couponController.getAllCoupons);
router.delete("/delete/:couponID", adminAuth, couponController.deleteCoupon);
router.post("/apply", checkAuth, couponController.applyCoupon);
router.post("/remove", checkAuth, couponController.removeCoupon);
router.get("/referralcode", checkAuth, couponController.getReferralCode);

module.exports = router;
