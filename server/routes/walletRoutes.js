const express = require("express");
const router = express.Router();

const walletController = require("../controllers/walletController");

const { checkAuth } = require("../middlewares/authMiddleware");
const { adminAuth } = require("../middlewares/adminAuthMiddleware");

router.get("/getbalance", checkAuth, walletController.getBalance);
router.post("/checkout", checkAuth, walletController.checkout);
router.post("/verification", walletController.verification);
router.post("/userverification", checkAuth, walletController.userverification);
router.get("/alltransaction", adminAuth, walletController.getAllTransaction);
router.get(
  "/transactionhistory",
  checkAuth,
  walletController.transactionHistory
);
router.post(
  "/canceltransaction",
  checkAuth,
  walletController.cancelTransaction
);
router.get("/stats", adminAuth, walletController.getStats);

module.exports = router;
