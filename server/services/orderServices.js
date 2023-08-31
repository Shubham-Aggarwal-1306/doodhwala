const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Trial = require("../models/trialModel");
const Subscribe = require("../models/subscribeModel");
const Product = require("../models/productModel");

const { getDeliveryDate } = require("../services/otherServices");

module.exports.checkFirstOrder = async (userID) => {
  var firstOrder = false;
  const order = await Order.findOne({
    user_id: userID,
    status: "approved",
  });
  if (!order) {
    firstOrder = true;
  }

  return firstOrder;
};

module.exports.checkStock = async (items) => {
  const inStock = { message: "", data: true};
  for (const prod of items) {
    const productInfo = await Product.findOne({ _id: prod["product_id"]});
    if (productInfo["in_stock"] === false) {
      inStock["message"] = `${productInfo["title"]} is not available.`
      inStock["data"] = false;
      break;
    }
  }
  return inStock;
};

module.exports.createOrder = async (userID, item, phone, address, userCart) => {
  const product = await Product.findOne({
    _id: userCart["items"][item]["product_id"],
  });
  if (userCart["items"][item]["order_type"] === "buy") {
    const deliveryDate = getDeliveryDate();
    const order = new Order({
      user_id: userID,
      product_id: userCart["items"][item]["product_id"],
      quantity: userCart["items"][item]["quantity"],
      final_price: product["price"] * userCart["items"][item]["quantity"],
      phone: phone,
      address: address,
      order_type: userCart["items"][item]["order_type"],
      status: "pending",
      cart: userCart,
      delivery_date: deliveryDate,
    });
    await order.save();
    return order;
  } else if (userCart["items"][item]["order_type"] === "trial") {
    const trialDays = userCart["items"][item]["quantity"];

    const deliveryDate = getDeliveryDate();
    const endDate = new Date();
    endDate.setDate(deliveryDate.getDate() + trialDays - 1);
    
    const deliveries = [];
    let currentDate = new Date(deliveryDate);
    while (currentDate <= endDate) {
      deliveries.push({
        date: new Date(currentDate),
        delivery_status: false,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const trialOrder = new Trial({
      user_id: userID,
      product: userCart["items"][item]["product_id"],
      days: trialDays,
      start_date: deliveryDate,
      end_date: endDate,
      deliveries: deliveries,
      status: "ongoing",
    });
    await trialOrder.save();

    const order = new Order({
      user_id: userID,
      product_id: userCart["items"][item]["product_id"],
      quantity: userCart["items"][item]["quantity"],
      final_price: product["price"] * userCart["items"][item]["quantity"],
      phone: phone,
      address: address,
      order_type: userCart["items"][item]["order_type"],
      status: "pending",
      trial_id: trialOrder["_id"],
      cart: userCart,
      delivery_date: deliveryDate,
    });
    await order.save();

    const findUser = await User.findById(userID);
    findUser["first_trial"] = true;
    await findUser.save(); 
    
    return order;
  } else if (userCart["items"][item]["order_type"] === "subscribe") {
    const subscribeMonths = userCart["items"][item]["quantity"];

    const deliveryDate = getDeliveryDate();
    const endDate = new Date(deliveryDate);
    endDate.setDate(deliveryDate.getDate() + subscribeMonths * 30 - 1);

    const deliveries = [];
    let currentDate = new Date(deliveryDate);
    while (currentDate <= endDate) {
      deliveries.push({
        date: new Date(currentDate),
        delivery_status: false,
        user_need: true,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const subscribeOrder = new Subscribe({
      user_id: userID,
      product: userCart["items"][item]["product_id"],
      months: subscribeMonths,
      start_date: deliveryDate,
      end_date: endDate,
      deliveries: deliveries,
      status: "ongoing",
    });
    await subscribeOrder.save();

    const order = new Order({
      user_id: userID,
      product_id: userCart["items"][item]["product_id"],
      quantity: userCart["items"][item]["quantity"],
      final_price: product["price"] * userCart["items"][item]["quantity"] * 30,
      phone: phone,
      address: address,
      order_type: userCart["items"][item]["order_type"],
      status: "pending",
      subscribe_id: subscribeOrder["_id"],
      cart: userCart,
      delivery_date: deliveryDate,
    });
    await order.save();
    return order;
  }
};
