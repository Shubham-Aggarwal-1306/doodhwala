const Referral = require("../models/referralModel");
const User = require("../models/userModel");

const voucher_codes = require("voucher-code-generator");

module.exports.createReferralCode = async (userID) => {
  const newReferral = new Referral();
  const code = voucher_codes.generate({
    length: 10,
    count: 1,
    prefix: "DUDH",
    pattern: "-##########",
  });
  newReferral["user_id"] = userID;
  newReferral["referral_code"] = code[0];
  await newReferral.save();

  return newReferral;
};

module.exports.checkReferUsed = async (userID) => {
  let referUsed = false;
  const userReferrals = await Referral.findOne({ user_id: userID });
  if (userReferrals["refree"]) {
    referUsed = true;
  }
  return referUsed;
};
