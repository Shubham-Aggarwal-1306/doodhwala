const Contact = require("../models/contactModal");
const User = require("../models/userModel");

module.exports.sendMessage = async (req, res) => {
  try {
    const userFireId = req.user.user_id;
    const userData = await User.findOne({ user_firebase_id: userFireId });
    if (userData) {
      const userMessage = new Contact({
        user_id: userData._id,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });
      await userMessage.save();
      return res.status(200).json({
        status: "success",
        message: "Message sent successfully.",
        data: userMessage,
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

module.exports.getAllMessages = async (req, res) => {
  try {
    const allMessages = await Contact.find().sort({ _id: -1 });
    if (allMessages.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "Messages found successfully.",
        data: allMessages,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "You have no messages.",
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

module.exports.getMessageOfUser = async (req, res) => {
  try {
    const userData = await User.findOne({
      _id: req.params.userID,
    });
    if (userData) {
      const allMessages = await Contact.find({
        user_id: req.params.userID,
      }).sort({ _id: -1 });
      if (allMessages.length > 0) {
        return res.status(200).json({
          status: "success",
          message: "Messages found successfully.",
          data: allMessages,
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "No messages.",
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
