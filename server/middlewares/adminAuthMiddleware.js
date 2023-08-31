const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");

const adminAuth = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await Admin.findById(decoded._id);
      if (req.user) {
        next();
      } else {
        return res.status(400).json({
          status: "failure",
          message: "Not a valid admin any more.",
          data: null,
        });
      }
    } catch (err) {
      res.status(401).json({
        status: "Failure",
        message: err.message,
        data: {
          token: null,
        },
      });
    }
  } else {
    res.status(401).json({
      status: "Failure",
      message: "You are not authorized, please login again",
      data: {
        token: null,
      },
    });
  }
});

module.exports = { adminAuth };
