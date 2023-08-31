const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const { adminAuth } = require("../middlewares/adminAuthMiddleware");
const { needAuth } = require("../middlewares/needAuthMiddleware");

router.post("/addProduct", adminAuth, productController.addProduct);
router.get("/getAllProducts", needAuth, productController.getAllProducts);
router.get("/:productID", needAuth, productController.getProductByID);
router.get("/", needAuth, productController.getProductsByCategory);
router.put("/update/:productID", adminAuth, productController.updateProduct);
router.delete("/:productID", adminAuth, productController.deleteProduct);

module.exports = router;
