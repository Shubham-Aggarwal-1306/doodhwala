const admin = require("../config/firebase");
const asyncHandler = require("express-async-handler");

const needAuth = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decode = await admin.auth().verifyIdToken(token);
    req.user = decode;
    next();
  } else {
    req.user = null;
    next();
  }
});

module.exports = { needAuth };
