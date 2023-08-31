const Coupon = require("../models/couponModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Referral = require("../models/referralModel");

const voucher_codes = require("voucher-code-generator");

const { getCartDiscount } = require("../services/cartServices");

module.exports.generateCoupon = async (req, res) => {
  try {
    const newCoupon = new Coupon();
    const coup = voucher_codes.generate({
      length: 6,
      count: 1,
      prefix: "DUDH",
      pattern: "-######",
    });
    newCoupon["coupon_code"] = coup[0];
    if (req.body.expiry) newCoupon["expiry"] = req.body.expiry;
    newCoupon["discount_type"] = req.body.discount_type;
    newCoupon["discount"] = req.body.discount;
    if (req.body.quantity) newCoupon["quantity"] = req.body.quantity;
    if (req.body.price) newCoupon["price"] = req.body.price;
    newCoupon["first_order"] = req.body.first_order;
    await newCoupon.save();

    return res.status(200).json({
      status: "success",
      message: "Coupon generated successfully.",
      data: newCoupon,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getAllCoupons = async (req, res) => {
  try {
    const allCoupons = await Coupon.find();
    if (allCoupons.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "All coupons found.",
        data: allCoupons,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "No coupons found.",
        data: null,
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.deleteCoupon = async (req, res) => {
  try {
    const couponID = req.params.couponID;
    await Coupon.deleteOne({ _id: couponID });
    return res.status(200).json({
      status: "success",
      message: "Coupon deleted successfully.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.applyCoupon = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const { coupon_code, cartID } = req.body;
      const userCart = await Cart.findOne({ _id: cartID });
      if (userCart) {
        if (userCart["items"].length <= 0) {
          return res.status(404).json({
            status: "failure",
            message: "Cart is empty.",
            data: null,
          });
        }
        const cartDiscount = await getCartDiscount(coupon_code, userCart);
        if (cartDiscount["status"] === "success") {
          userCart["coupon_code"] = coupon_code;
          userCart["discount"] = cartDiscount["data"];
          userCart["total"] =
            userCart["sub_total"] + userCart["gst"] - userCart["discount"];
          await userCart.save();
          return res.status(200).json({
            status: "success",
            message: cartDiscount["message"],
            data: userCart["discount"],
          });
        } else {
          return res.status(400).json({
            status: "failure",
            message: cartDiscount["message"],
            data: null,
          });
        }
      } else {
        return res.status(404).json({
          status: "failure",
          message: "Cart not found.",
          data: null,
        });
      }
    } else {
      return res.status(404).json({
        status: "failure",
        message: "User not found.",
        data: null,
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.removeCoupon = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const { coupon_code, cartID } = req.body;
      let coupon = await Coupon.findOne({ coupon_code: coupon_code });
      if (!coupon) {
        coupon = await Referral.findOne({ referral_code: coupon_code });
      }
      if (coupon) {
        const userCart = await Cart.findOne({ _id: cartID });
        if (userCart) {
          userCart["total"] += userCart["discount"];
          userCart["discount"] = 0;
          userCart["coupon"] = "";
          await userCart.save();
          return res.status(200).json({
            status: "success",
            message: "Coupon removed successfully.",
            data: userCart,
          });
        } else {
          return res.status(404).json({
            status: "failure",
            message: "Cart not found.",
            data: null,
          });
        }
      } else {
        return res.status(404).json({
          status: "failure",
          message: "Code invalid.",
          data: null,
        });
      }
    } else {
      return res.status(404).json({
        status: "failure",
        message: "User not found.",
        data: null,
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getReferralCode = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId }).populate(["referral"]);
    if (userData) {
      return res.status(200).json({
        status: "success",
        message: "Users referral code.",
        data: [{
          referral_code: userData["referral"]["referral_code"],
          number_of_referrals: userData["referral"]["referrals"].length
        }],
      });
    } else {
      return res.status(404).json({
        status: "failure",
        message: "User not found.",
        data: null,
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};