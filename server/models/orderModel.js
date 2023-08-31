const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    final_price: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    order_type: {
      type: String,
      enum: ["buy", "trial", "subscribe"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "cancelled", "approved", "completed"],
      default: "pending",
    },
    trial_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trial",
    },
    subscribe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscribe",
    },
    cart: {
      type: Array,
      required: true,
    },
    delivery_date: {
      type: Date,
    },
  },
  { timeStamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
