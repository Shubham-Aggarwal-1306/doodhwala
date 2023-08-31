const mongoose = require("mongoose");

const TrialSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    deliveries: [
      {
        date: {
          type: Date,
          required: true,
        },
        delivery_status: {
          type: Boolean,
          default: false,
        },
      },
    ],
    status: {
      type: String,
      enum: ["cancelled", "ongoing", "completed"],
      default: "ongoing",
    },
  },
  { timeStamps: true }
);

const Trial = mongoose.model("Trial", TrialSchema);
module.exports = Trial;
