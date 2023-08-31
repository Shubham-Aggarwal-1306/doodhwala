const mongoose = require("mongoose");

const ReferralSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    referral_code: {
        type: String,
        required: true,
        unique: true,
    },
    referrals: {
        type: [String],
        default: [],
    },
    refree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
});

const Referral = mongoose.model("Referral", ReferralSchema);
module.exports = Referral;
