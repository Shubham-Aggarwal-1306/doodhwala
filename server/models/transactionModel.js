const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_type: {
      type: String,
      enum: ["refund", "recharge", "order", "referral"],
      default: "recharge",
      required: true,
    },
    orders: [
      {
        order_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        order_type: {
          type: String,
        },
      },
    ],
    transaction_type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_response: {
      type: String,
      enum: ["success", "cancelled", "pending"],
      default: "pending",
      required: true,
    },
    razorpay_order_id: {
      type: String,
    },
    razorpay_payment_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
