const express = require("express");
const router = express.Router();

const galleryController = require("../controllers/galleryController");
const { adminAuth } = require("../middlewares/adminAuthMiddleware");

router.get("/get", galleryController.getAllImages);
router.post("/add", adminAuth, galleryController.addImages);
router.delete("/delete/:imageId", adminAuth, galleryController.deleteImages);

module.exports = router;
