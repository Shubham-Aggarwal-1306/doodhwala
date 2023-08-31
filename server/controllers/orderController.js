const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Trial = require("../models/trialModel");
const Subscribe = require("../models/subscribeModel");

const {
  getCurrentBalance,
  debitAmount,
  creditReferral
} = require("../services/walletServices");
const { createOrder, checkStock } = require("../services/orderServices");
const { getUserDetail } = require("../services/userServices");
const Referral = require("../models/referralModel");

module.exports.checkout = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const { phone, address } = req.body;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const userCart = await Cart.findOne({ user_id: userData._id });
      if (userCart) {
        const referralCode = userCart["coupon_code"];
        if (userCart["items"].length > 0) {
          const currentBalance = await getCurrentBalance(userData._id);
          if (currentBalance >= userCart["total"]) {
            const inStock = await checkStock(userCart["items"]);
            if (inStock["data"] === false) {
              return res.status(400).json({
                status: "failure",
                message: inStock["message"],
                data: null,
              });
            }
            
            const orders = [];
            for (const item in userCart["items"]) {
              const userOrder = await createOrder(
                userData._id,
                item,
                phone,
                address,
                userCart
              );
              orders.push({
                order_id: userOrder._id,
                order_type: userCart["items"][item]["order_type"],
              });
            }
            await debitAmount(
              userData._id,
              userCart["total"],
              currentBalance,
              orders
            );
            userCart["items"] = [];
            userCart["coupon_code"] = "";
            userCart["sub_total"] = 0;
            userCart["gst"] = 0;
            userCart["discount"] = 0;
            userCart["total"] = 0;
            await userCart.save();

            const referralCodeDetails = await Referral.findOne({ referral_code: referralCode });
            if (referralCodeDetails) {
              referralCodeDetails["referrals"].push(userCart["user_id"]);
              await referralCodeDetails.save(); 

              const userRef = await Referral.findOne({ user_id: userCart["user_id"] });
              userRef["refree"] = referralCodeDetails["user_id"];
              await userRef.save();

              const refreeBalance = await getCurrentBalance(referralCodeDetails["user_id"]);
              const addRefAmount = await creditReferral(referralCodeDetails["user_id"], refreeBalance);
            }

            return res.status(200).json({
              status: "success",
              message: "Checkout successful.",
              data: null,
            });
          } else {
            return res.status(401).json({
              status: "failure",
              message: "Insufficient balance.",
              data: null,
            });
          }
        } else {
          return res.status(400).json({
            status: "failure",
            message: "No item in cart.",
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

module.exports.approveOrder = async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const order = await Order.findById(orderID);
    if (order) {
      order["status"] = "approved";
      await order.save();
      return res.status(200).json({
        status: "success",
        message: "Order approved.",
        data: order,
      });
    }
    return res.status(404).json({
      status: "failure",
      message: "Order not found.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.completeOrder = async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const order = await Order.findById(orderID);
    if (order) {
      order["status"] = "completed";
      await order.save();
      return res.status(200).json({
        status: "success",
        message: "Order completed.",
        data: order,
      });
    }
    return res.status(404).json({
      status: "failure",
      message: "Order not found.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.cancelOrder = async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const order = await Order.findById(orderID);
    if (order) {
      order["status"] = "cancelled";
      await order.save();
      return res.status(200).json({
        status: "success",
        message: "Order cancelled.",
        data: order,
      });
    }
    return res.status(404).json({
      status: "failure",
      message: "Order not found.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.addVacation = async (req, res) => {
  try {
    const subscribeID = req.body.subscribe_id;
    const subscribeOrder = await Subscribe.findById(subscribeID);
    if (subscribeOrder) {
      var { start_date, end_date } = req.body;
      start_date = new Date(start_date);
      end_date = new Date(end_date);
      let startMonth = start_date.getMonth() + 1;
      let endMonth = end_date.getMonth() + 1;
      let startDate = start_date.getDate();
      let endDate = end_date.getDate();
      if (
        startMonth === subscribeOrder["start_date"].getMonth() + 1 &&
        endMonth === subscribeOrder["end_date"].getMonth() + 1 &&
        startDate >= subscribeOrder["start_date"].getDate() &&
        endDate <= subscribeOrder["end_date"].getDate()
      ) {
        subscribeOrder["vacation"] = {
          start_date,
          end_date,
        };
        subscribeOrder["deliveries"].forEach((delivery) => {
          delivery["user_need"] = true;
          if (delivery["date"] >= start_date && delivery["date"] <= end_date) {
            delivery["user_need"] = false;
          }
        });
        await subscribeOrder.save();
        return res.status(200).json({
          status: "success",
          message: "Vacation added successfully.",
          data: subscribeOrder,
        });
      } else {
        return res.status(400).json({
          status: "failure",
          message: "Wrong vacation dates.",
          data: null,
        });
      }
    }
    return res.status(404).json({
      status: "failure",
      message: "Order not found.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getOrdersOfUser = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const query = req.query.orderType;
      var allOrders;
      if (query === "buy") {
        allOrders = await Order.find({
          user_id: userData._id,
          order_type: "buy",
        })
          .populate(["product_id"])
          .sort({ _id: -1 });
      } else if (query === "trial") {
        allOrders = await Order.find({
          user_id: userData._id,
          order_type: "trial",
        })
          .populate(["trial_id", "product_id"])
          .sort({ _id: -1 });
      } else if (query === "subscribe") {
        allOrders = await Order.find({
          user_id: userData._id,
          order_type: "subscribe",
        })
          .populate(["subscribe_id", "product_id"])
          .sort({ _id: -1 });
      } else {
        allOrders = await Order.find({ user_id: userData._id })
          .populate(["product_id", "subscribe_id", "trial_id"])
          .sort({ _id: -1 });
      }
      if (allOrders.length > 0) {
        return res.status(200).json({
          status: "success",
          message: "All orders found.",
          data: allOrders,
        });
      }
      return res.status(200).json({
        status: "success",
        message: "No orders yet.",
        data: null,
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

module.exports.getActiveServices = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const userID = userData._id;
      const activeServices = { trials: "", subscribes: "" };
      activeServices["trials"] = await Trial.find({
        user_id: userID,
        status: "ongoing",
      }).populate(["product"]);
      activeServices["subscribes"] = await Subscribe.find({
        user_id: userID,
        status: "ongoing",
      }).populate(["product"]);
      return res.status(200).json({
        status: "success",
        message: "All services found.",
        data: activeServices,
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

module.exports.getAllOrders = async (req, res) => {
  try {
    const query = req.query.type;
    var allOrders;
    if (query === "buy") {
      allOrders = await Order.find({ order_type: "buy" }).populate([
        "product_id",
      ]);
    } else if (query === "trial") {
      allOrders = await Order.find({ order_type: "trial" }).populate([
        "trial_id",
        "product_id",
      ]);
    } else if (query === "subscribe") {
      allOrders = await Order.find({ order_type: "subscribe" }).populate([
        "subscribe_id",
        "product_id",
      ]);
    } else if (query === "all") {
      allOrders = await Order.find().populate(["product_id"]);
    } else if (query === "approved") {
      allOrders = await Order.find({ status: "approved" }).populate([
        "product_id",
      ]);
    } else if (query === "cancelled") {
      allOrders = await Order.find({ status: "cancelled" }).populate([
        "product_id",
      ]);
    } else if (query === "completed") {
      allOrders = await Order.find({ status: "completed" }).populate([
        "product_id",
      ]);
    } else if (query === "pending") {
      allOrders = await Order.find({ status: "pending" }).populate([
        "product_id",
      ]);
    } else {
      allOrders = [];
    }
    if (allOrders.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "All orders found.",
        data: allOrders,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "No orders yet.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getOrder = async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const order = await Order.findById(orderID).populate([
      "product_id",
      "subscribe_id",
      "trial_id",
    ]);
    if (order) {
      const getUser = await getUserDetail(order["user_id"]);
      order._doc.user_id = getUser["data"];
      return res.status(200).json({
        status: "success",
        message: "Order found successfully.",
        data: order,
      });
    }
    return res.status(404).json({
      status: "failure",
      message: "Order not found.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getOrderStats = async (req, res) => {
  try {
    const orderStats = {
      total_orders: 0,
      pending_orders: 0,
      cancelled_orders: 0,
      approved_orders: 0,
      completed_orders: 0,
    }

    const allOrders = await Order.find({});
    if (allOrders.length > 0) {
      for (const order of allOrders) {
        if (order["status"] === "pending") {
          orderStats["pending_orders"] += 1;
        } else if (order["status"] === "cancelled") {
          orderStats["cancelled_orders"] += 1;
        } else if (order["status"] === "approved") {
          orderStats["approved_orders"] += 1;
        } else if (order["status"] === "completed") {
          orderStats["completed_orders"] += 1;
        }
        orderStats["total_orders"] += 1;
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Orders found successfully.",
      data: orderStats,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};
