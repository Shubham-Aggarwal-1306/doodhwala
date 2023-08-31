const mongoose = require("mongoose");

const CouponSchema = mongoose.Schema(
  {
    coupon_code: {
      type: String,
      required: true,
      unique: true,
      upperCase: true,
    },
    expiry: {
      type: Date,
    },
    discount_type: {
      type: String,
      enum: ["percent", "fixed"],
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    first_order: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponSchema);
module.exports = Coupon;
