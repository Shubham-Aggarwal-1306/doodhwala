const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");

module.exports.addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const adminData = await Admin.findOne({ email: email });
    if (!adminData) {
      const newAdmin = new Admin({ name, email, password });
      await newAdmin.save();
      return res.status(200).json({
        status: "success",
        message: "Admin registered successfully.",
        data: newAdmin,
      });
    }
    return res.status(400).json({
      status: "failure",
      message: "Email already exist. Please use different email.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    const adminData = await Admin.findOne({ email: email });
    if (adminData) {
      const isMatch = await bcrypt.compare(password, adminData["password"]);
      if (isMatch) {
        token = await adminData.generateAuthToken();
        return res.status(200).json({
          status: "success",
          message: "Admin logged in successfully.",
          data: {
            admin: adminData,
            accessToken: token,
          },
        });
      } else {
        return res.status(400).json({
          status: "failure",
          message: "Invalid password.",
          data: null,
        });
      }
    } else {
      return res.status(404).json({
        status: "failure",
        message: "Admin not found.",
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

module.exports.loadAdmin = async (req, res) => {
  try {
    let token;
    token = await req.user.generateAuthToken();
    return res.status(200).json({
      status: "success",
      message: "Admin logged in successfully.",
      data: {
        accessToken: token,
      },
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};
