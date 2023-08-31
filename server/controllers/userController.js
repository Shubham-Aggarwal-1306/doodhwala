const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const {
  getAllUserDetails,
  getUserDetail,
} = require("../services/userServices");

const { createReferralCode } = require("../services/referralServices");

module.exports.addUser = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (!userData) {
      const newUser = new User();
      newUser["user_firebase_id"] = userFireId;

      const refCode = await createReferralCode(newUser["_id"]);

      newUser["referral"] = refCode["_id"];
      await newUser.save();

      const addToCart = new Cart({
        user_id: newUser._id,
        items: [],
        total: 0,
      });
      await addToCart.save();

      return res.status(200).json({
        status: "success",
        message: "User added successfully.",
        data: newUser,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "User already exist.",
      data: userData.user_firebase_id,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsersData = await getAllUserDetails();
    return res.status(200).json({
      status: "success",
      message: "All users found.",
      data: allUsersData,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const getUser = await getUserDetail(req.params.userID);
    if (getUser["status"] === "success") {
      return res.status(200).json({
        status: "success",
        message: getUser["message"],
        data: getUser["data"],
      });
    } else {
      return res.status(404).json({
        status: "failure",
        message: getUser["message"],
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

module.exports.getUserStats = async (req, res) => {
  try {
    const getUsers = await User.find({});
    return res.status(200).json({
      status: "success",
      message: "User stats.",
      data: {
        total_users: getUsers.length
      },
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};
