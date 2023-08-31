const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const {
  getProductTotal,
  getCartSubTotal,
  getCartGST,
  getCartDiscount,
} = require("../services/cartServices");
const { checkFirstTrial, createUserWithFireID } = require("../services/userServices");

module.exports.getCart = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    let userData = await User.findOne({ user_firebase_id: userFireId });
    if (userFireId && !userData) {
      userData = await createUserWithFireID(userFireId);
    }
    if (userData) {
      var fullCart = {};
      const userCart = await Cart.findOne({ user_id: userData._id }).populate([
        "items.product_id",
      ]);
      if (userCart) {
        fullCart = await getProductTotal(userCart);
        return res.status(200).json({
          status: "success",
          message: "Cart found successfully.",
          data: fullCart,
        });
      } else {
        const newCart = new Cart({
          user_id: userData._id,
          items: [],
        });
        await newCart.save();
        return res.status(200).json({
          status: "success",
          message: "Cart found successfully.",
          data: newCart,
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

module.exports.addToCart = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const productId = req.body.product_id;
    const quantity = req.body.quantity;
    const orderType = req.body.order_type;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const product = await Product.findOne({ _id: productId });
      if (product) {
        if (orderType === "trial") {
          const firstTrial = await checkFirstTrial(userData._id);
          if (firstTrial) {
            return res.status(401).json({
              status: "failure",
              message: "You have already used a Trial before. No more trials are available.",
              data: null,
            });
          }
        }
        var userCart = await Cart.findOne({ user_id: userData._id });
        if (!userCart) {
          userCart = new Cart({
            user_id: userData._id,
            items: [],
          });
        }
        for (let x in userCart["items"]) {
          if (userCart["items"][x]["product_id"].equals(productId)) {
            return res.status(200).json({
              status: "success",
              message: "Product already added.",
              data: null,
            });
          }
        }
        userCart["items"].push({
          product_id: productId,
          quantity: quantity,
          order_type: orderType,
        });

        userCart["sub_total"] = await getCartSubTotal(userCart);
        userCart["gst"] = await getCartGST(userCart["sub_total"]);
        const cartDiscount = getCartDiscount(userCart["coupon_code"], userCart);
        if (cartDiscount["status"] === "success") {
          userCart["discount"] = cartDiscount["data"];
        } else {
          userCart["discount"] = 0;
        }
        userCart["total"] =
          userCart["sub_total"] + userCart["gst"] - userCart["discount"];
        await userCart.save();

        return res.status(200).json({
          status: "success",
          message: "Product added to cart successfully.",
          data: userCart,
        });
      } else {
        return res.status(404).json({
          status: "failure",
          message: "Product not found.",
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
    return res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.removeFromCart = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const productId = req.body.product_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const product = await Product.findOne({ _id: productId });
      if (product) {
        var userCart = await Cart.findOne({ user_id: userData._id });
        if (userCart) {
          const itemIndex = userCart["items"].findIndex(
            (item) => item.product_id == productId
          );
          if (itemIndex === -1) {
            return res.status(404).json({
              status: "failure",
              message: "Product not found in cart.",
              data: null,
            });
          }
          userCart["items"].splice(itemIndex, 1);

          userCart["sub_total"] = await getCartSubTotal(userCart);
          userCart["gst"] = await getCartGST(userCart["sub_total"]);
          const cartDiscount = getCartDiscount(
            userCart["coupon_code"],
            userCart
          );
          if (cartDiscount["status"] === "success") {
            userCart["discount"] = cartDiscount["data"];
          } else {
            userCart["discount"] = 0;
          }
          userCart["total"] =
            userCart["sub_total"] + userCart["gst"] - userCart["discount"];
          await userCart.save();

          return res.status(200).json({
            status: "success",
            message: "Product removed from cart successfully.",
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
          message: "Product not found.",
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
