const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const walletRoutes = require("./routes/walletRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const couponRoutes = require("./routes/couponRoutes");
const adminRoutes = require("./routes/adminRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      status: "success",
      message: "API running successfully",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: "API not running successfully",
      data: null,
    });
  }
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/wallet", walletRoutes);
app.use("/order", orderRoutes);
app.use("/contact", contactRoutes);
app.use("/coupon", couponRoutes);
app.use("/admin", adminRoutes);
app.use("/gallery", galleryRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(`Error: ${err}`.red);
  }
  console.log(`Server running on PORT ${process.env.PORT}`.blue.underline);
});
