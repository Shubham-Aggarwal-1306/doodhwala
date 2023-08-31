const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Referral = require("../models/referralModel");

const { checkFirstOrder } = require("../services/orderServices");
const { checkReferUsed } = require("../services/referralServices");

module.exports.getQuantity = async (productList, cartList) => {
  const allProducts = [];
  const quantityLookup = {};
  cartList["items"].forEach((quantity) => {
    quantityLookup[quantity.product_id] = quantity.quantity;
  });
  productList.forEach((product) => {
    const quantity = quantityLookup[product.id] || 0;
    const mergedObject = { ...product["_doc"], quantity };
    allProducts.push(mergedObject);
  });

  return allProducts;
};

module.exports.getOrderType = async (productList, cartList) => {
  const allProducts = [];
  const orderTypeLookup = {};
  cartList["items"].forEach((orderType) => {
    orderTypeLookup[orderType.product_id] = orderType.order_type;
  });
  productList.forEach((product) => {
    const orderType = orderTypeLookup[product.id] || 0;
    const mergedObject = { ...product["_doc"], orderType };
    allProducts.push(mergedObject);
  });

  return allProducts;
};

module.exports.getOrderTypeAndQuantity = async (productList, cartList) => {
  const allProducts = [];

  const quantityLookup = {};
  cartList["items"].forEach((quantity) => {
    quantityLookup[quantity.product_id] = quantity.quantity;
  });

  const orderTypeLookup = {};
  cartList["items"].forEach((orderType) => {
    orderTypeLookup[orderType.product_id] = orderType.order_type;
  });

  productList.forEach((product) => {
    const quantity = quantityLookup[product.id] || 0;
    const orderType = orderTypeLookup[product.id] || "Unknown";
    const mergedObject = { ...product["_doc"], quantity, orderType };
    allProducts.push(mergedObject);
  });

  return allProducts;
};

module.exports.getProductTotal = async (cartList) => {
  cartList["items"].forEach((product) => {
    const price = product["product_id"]["price"];
    if (product["order_type"] === "buy" || product["order_type"] === "trial") {
      product["_doc"]["total_amount"] = product["quantity"] * price;
    } else if (product["order_type"] === "subscribe") {
      product["_doc"]["total_amount"] = product["quantity"] * 30 * price;
    }
  });

  return cartList;
};

module.exports.getCartSubTotal = async (cartList) => {
  var subTotalOfCart = 0;
  for (const item of cartList["items"]) {
    const { price } = await Product.findById(item.product_id);
    if (item["order_type"] === "buy" || item["order_type"] === "trial") {
      subTotalOfCart += item.quantity * price;
    } else if (item["order_type"] === "subscribe") {
      subTotalOfCart += item.quantity * 30 * price;
    }
  }
  return subTotalOfCart;
};

module.exports.getCartGST = async (subTotal) => {
  var totalGST = 0;
  // for (const item of cartList["items"]) {
  //   const { price } = await Product.findById(item.product_id);
  //   if (item["order_type"] === "buy" || item["order_type"] === "trial") {
  //     totalGST += item.quantity * price;
  //   } else if (item["order_type"] === "subscribe") {
  //     totalGST += item.quantity * 30 * price;
  //   }
  // }
  return totalGST;
};

module.exports.getCartDiscount = async (coupon_code, userCart) => {
  let response = { status: "", message: "", data: null };

  const getCoupon = await Coupon.findOne({ coupon_code: coupon_code });
  const getReferral = await Referral.findOne({ referral_code: coupon_code });
  if (coupon_code && getCoupon) {
    if (getCoupon["expiry"]) {
      const currentDate = new Date();
      if (currentDate > getCoupon["expiry"]) {
        response["status"] = "failure";
        response["message"] = "Coupon Code expired.";
        return response;
      }
    }
    if (getCoupon["first_order"]) {
      const firstOrder = await checkFirstOrder(userCart["user_id"]);
      if (!firstOrder) {
        response["status"] = "failure";
        response["message"] = "Valid for only first order.";
        return response;
      }
    }
    if (getCoupon["quantity"]) {
      var cartItemQuantity = 0;
      for (const item of userCart["items"]) {
        if (item["order_type"] === "buy") {
          cartItemQuantity += item["quantity"];
        } else if (
          item["order_type"] === "trial" ||
          item["order_type"] === "subscribe"
        ) {
          cartItemQuantity += 1;
        }
      }
      if (cartItemQuantity < getCoupon["quantity"]) {
        response["status"] = "failure";
        response["message"] = "Item quantity is low.";
        return response;
      }
    }
    if (getCoupon["price"]) {
      if (userCart["total"] < getCoupon["price"]) {
        response["status"] = "failure";
        response["message"] = "Item price is low.";
        return response;
      }
    }

    var discountAmount = 0;
    if (getCoupon["discount_type"] === "percent") {
      discountAmount = (getCoupon["discount"] / 100) * userCart["total"];
    } else if (getCoupon["discount_type"] === "fixed") {
      discountAmount = getCoupon["discount"];
    }
    const cartTotal = userCart["sub_total"] + userCart["gst"]
    if (cartTotal < discountAmount) {
      discountAmount = cartTotal;
    }
    response["status"] = "success";
    response["message"] = "Coupon code applied";
    response["data"] = discountAmount;

  } else if (coupon_code && getReferral && !(getReferral["user_id"].equals(userCart["user_id"]))) {
    const checkRefer = await checkReferUsed(userCart["user_id"]);
    if (checkRefer || checkRefer === null) {
      response["status"] = "failure";
      response["message"] = "You have used a referral before.";
      return response;
    }
    const firstOrder = await checkFirstOrder(userCart["user_id"]);
    if (!firstOrder) {
      response["status"] = "failure";
      response["message"] = "Valid for only first order.";
      return response;
    }
    var discountAmount = process.env.REFERRAL_AMOUNT;
    const cartTotal = userCart["sub_total"] + userCart["gst"]
    if (cartTotal < discountAmount) {
      discountAmount = cartTotal;
    }
    response["status"] = "success";
    response["message"] = "Referral code applied";
    response["data"] = discountAmount;
  } else {
    response["status"] = "failure";
    response["message"] = "Wrong code.";
  }

  return response;
};
