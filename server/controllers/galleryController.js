const Gallery = require("../models/galleryModel");

module.exports.getAllImages = async (req, res) => {
  try {
    const galleryImages = await Gallery.find({});
    return res.status(200).json({
      status: "success",
      message: "Gallery images found.",
      data: galleryImages,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.addImages = async (req, res) => {
  try {
    const { images } = req.body;
    const galleryItems = images.map((image) => ({ image }));
    const insertedItems = await Gallery.insertMany(galleryItems);
    return res.status(200).json({
      status: "success",
      message: "Images added to gallery.",
      data: insertedItems,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.deleteImages = async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const deletedImage = await Gallery.findByIdAndRemove(imageId);
    if (!deletedImage) {
      return res.status(404).json({
        status: "success",
        message: "Image not found.",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Image deleted successfully.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};
