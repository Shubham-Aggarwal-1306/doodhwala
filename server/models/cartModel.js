const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        order_type: {
          type: String,
          enum: ["buy", "trial", "subscribe"],
          required: true,
          default: "buy",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    coupon_code: {
      type: String,
      default: ""
    },
    sub_total: {
      type: Number,
      default: 0,
    },
    gst: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
