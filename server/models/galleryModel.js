const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Gallery = mongoose.model("Gallery", GallerySchema);
module.exports = Gallery;
