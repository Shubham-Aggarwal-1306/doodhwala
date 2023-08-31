const mongoose = require("mongoose");

const SubscribeSchema = mongoose.Schema(
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
    months: {
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
    vacation: {
      start_date: {
        type: Date,
      },
      end_date: {
        type: Date,
      },
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
        user_need: {
          type: Boolean,
          default: true,
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

const Subscribe = mongoose.model("Subscribe", SubscribeSchema);
module.exports = Subscribe;
