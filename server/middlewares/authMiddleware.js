const admin = require("../config/firebase");
const asyncHandler = require("express-async-handler");

const checkAuth = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = await admin.auth().verifyIdToken(token);
      req.user = decode;
      next();
    } catch (err) {
      res.status(400).json({
        status: "Failure",
        message: err.message,
        data: null,
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

module.exports = { checkAuth };
