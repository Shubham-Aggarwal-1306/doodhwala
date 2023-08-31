const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    in_stock: {
      type: Boolean,
      default: true,
    },
    order_type: {
      type: Array,
      items: {
        type: String,
        enum: ["buy", "trial", "subscribe"],
      },
      required: true,
    },
    brand_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Dairy"],
      required: true,
    },
    benefits: {
      type: Array,
      default: [
        "Produce thickest layer of natural Malai (cream)",
        "Rich source of calcium & minerals",
        "Significantly helps in strengthening the bones",
        "Buffalo milk is more protein-dense which helps in building and repairing the muscles",
        "Higher fat can be good option for those trying to gain weight",
        "Buffalo milk can do wonders to your skin",
        "Best for making curd, ghee and sweets at home",
      ],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
