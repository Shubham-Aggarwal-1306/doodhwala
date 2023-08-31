const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

const shortid = require("shortid");
const crypto = require("crypto");

const { instance } = require("../config/razorpay");

const { getCurrentBalance } = require("../services/walletServices");
const { getUserDetail, createUserWithFireID } = require("../services/userServices");

module.exports.getBalance = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    let userData = await User.findOne({ user_firebase_id: userFireId });
    if (userFireId && !userData) {
      userData = await createUserWithFireID(userFireId);
    }
    if (userData) {
      const currentBalance = await getCurrentBalance(userData._id);
      return res.status(200).json({
        status: "success",
        message: "User current balance.",
        data: currentBalance,
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

module.exports.checkout = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const currentBalance = await getCurrentBalance(userData._id);
      const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
        receipt: shortid.generate(),
        payment_capture: 1,
      };
      const order = await instance.orders.create(options);
      if (order.status === "created") {
        const userTransaction = new Transaction({
          user_id: userData._id,
          order_type: "recharge",
          transaction_type: "credit",
          balance: currentBalance,
          amount: req.body.amount,
          payment_response: "pending",
          razorpay_order_id: order.id,
        });
        await userTransaction.save();
        return res.status(200).json({
          status: "success",
          message: "Order Placed.",
          data: order,
        });
      } else {
        return res.status(401).json({
          status: "failure",
          message: "Order not created.",
          data: order,
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

module.exports.verification = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET_KEY;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("Payment legit.");
    }
    return res.status(200).json({
      status: "success",
      message: "Payment done successfully.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.userverification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      const userTransaction = await Transaction.findOne({
        razorpay_order_id: razorpay_order_id,
      });
      userTransaction["balance"] += userTransaction["amount"];
      userTransaction["payment_response"] = "success";
      userTransaction["razorpay_payment_id"] = razorpay_payment_id;
      await userTransaction.save();
      return res.status(200).json({
        status: "success",
        message: "Payment done successfully.",
        data: null,
      });
    } else {
      const userTransaction = await Transaction.findOne({
        razorpay_order_id: razorpay_order_id,
      });
      userTransaction["payment_response"] = "failure";
      await userTransaction.save();
      return res.status(401).json({
        status: "failure",
        message: "Payment not authenticated.",
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

module.exports.getAllTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    if (transactions.length > 0) {
      for (const doc of transactions) {
        const getUser = await getUserDetail(doc["user_id"]);
        doc._doc.user_id = getUser["data"];
      }
      return res.status(200).json({
        status: "success",
        message: "Transaction history found.",
        data: transactions,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "No Transaction history.",
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.transactionHistory = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      var userTransactions = await Transaction.find({
        user_id: userData._id,
        payment_response: {
          $in: ["success", "pending"],
        },
      }).sort({ _id: -1 });
      if (userTransactions.length > 0) {
        return res.status(200).json({
          status: "success",
          message: "Transaction history found.",
          data: userTransactions,
        });
      }
      return res.status(200).json({
        status: "success",
        message: "No Transaction history.",
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

module.exports.cancelTransaction = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const { razorpay_order_id } = req.body;
      const transaction = await Transaction.findOne({
        razorpay_order_id: razorpay_order_id,
      });
      if (transaction) {
        transaction["payment_response"] = "cancelled";
        await transaction.save();
        return res.status(200).json({
          status: "success",
          message: "Transaction cancelled successfully.",
          data: transaction,
        });
      }
      return res.status(404).json({
        status: "failure",
        message: "No Transaction Found.",
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

module.exports.getStats = async (req, res) => {
  try {
    const statType = req.query.type;
    if (statType === "months") {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ];
      const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const monthlyStats = {};
      for (const month of months) {
        monthlyStats[monthNames[month - 1]] = 0;
      }
      const transactions = await Transaction.find({
        payment_response: "success",
        transaction_type: "debit",
        order_type: "order",
      });
      for (const transaction of transactions) {
        const monthString = monthNames[new Date(transaction.createdAt).getMonth()];
        monthlyStats[monthString] += transaction.amount;
      }
      return res.status(200).json({
        status: "success",
        message: "Monthly stats.",
        data: monthlyStats,
      });
    } else if (statType === "years") {
      const currentYear = new Date().getFullYear();
      const years = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
      const yearlyStats = {};
      for (const year of years) {
        yearlyStats[year] = 0;
      }
      const transactions = await Transaction.find({
        payment_response: 'success',
        transaction_type: 'debit',
        order_type: 'order',
      });
      for (const transaction of transactions) {
        const year = new Date(transaction.createdAt).getFullYear();
        yearlyStats[year] += transaction.amount;
      }
      return res.status(200).json({
        status: "success",
        message: "Yearly stats.",
        data: yearlyStats,
      });
    } else {
      return res.status(404).json({
        status: "failure",
        message: "Wrong Parameter.",
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
