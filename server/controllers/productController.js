const Product = require("../models/productModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const { getOrderTypeAndQuantity } = require("../services/cartServices");
const { createUserWithFireID } = require("../services/userServices");

module.exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product();
    newProduct["title"] = req.body.title;
    newProduct["images"] = req.body.images;
    newProduct["description"] = req.body.description;
    newProduct["price"] = req.body.price;
    newProduct["size"] = req.body.size;
    newProduct["in_stock"] = req.body.in_stock;
    newProduct["order_type"] = req.body.order_type;
    newProduct["brand_name"] = req.body.brand_name;
    newProduct["category"] = req.body.category;
    if (req.body.benefits) newProduct["benefits"] = req.body.benefits;
    await newProduct.save();

    return res.status(200).json({
      status: "success",
      message: "Product added successfully.",
      data: newProduct,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getAllProducts = async (req, res) => {
  try {
    var allProducts = [];
    const products = await Product.find();
    if (req.user) {
      const userData = await User.findOne({
        user_firebase_id: req.user.user_id,
      });
      var userCart = await Cart.findOne({ user_id: userData._id });
      if (!userCart) {
        userCart = new Cart({
          user_id: userData._id,
          items: [],
        });
      }
      allProducts = await getOrderTypeAndQuantity(products, userCart);
    } else {
      allProducts = products;
    }
    return res.status(200).json({
      status: "success",
      message: "All products found.",
      data: allProducts,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getProductByID = async (req, res) => {
  try {
    var allProducts = [];
    const product_id = req.params.productID;
    const product = await Product.findById(product_id);
    const product_info = [product];
    if (product) {
      if (req.user) {
        const userData = await User.findOne({
          user_firebase_id: req.user.user_id,
        });
        var userCart = await Cart.findOne({ user_id: userData._id });
        if (!userCart) {
          userCart = new Cart({
            user_id: userData._id,
            items: [],
          });
        }
        allProducts = await getOrderTypeAndQuantity(product_info, userCart);
      } else {
        allProducts = product_info;
      }
      return res.status(200).json({
        status: "success",
        message: "Product found successfully.",
        data: allProducts,
      });
    } else {
      return res.status(404).json({
        status: "failure",
        message: "Product not found.",
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

module.exports.getProductsByCategory = async (req, res) => {
  try {
    var allProducts = [];
    const category = req.query.category;
    const products = await Product.find({
      category: category,
      order_type: {
        $all: ["buy", "subscribe", "trial"],
      },
    }).limit(3);
    if (products.length > 0) {
      if (req.user) {
        let userData = await User.findOne({
          user_firebase_id: req.user.user_id,
        });
        if (req.user.user_id && !userData) {
          userData = await createUserWithFireID(userFireId);
        }
        var userCart = await Cart.findOne({ user_id: userData._id });
        if (!userCart) {
          userCart = new Cart({
            user_id: userData._id,
            items: [],
          });
        }
        allProducts = await getOrderTypeAndQuantity(products, userCart);
      } else {
        allProducts = products;
      }
      return res.status(200).json({
        status: "success",
        message: "Products found successfully.",
        data: allProducts,
      });
    } else {
      return res.status(404).json({
        status: "failure",
        message: "Products not found.",
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

module.exports.updateProduct = async (req, res) => {
  try {
    const product_id = req.params.productID;
    const product = await Product.findById(product_id);
    if (product) {
      if (req.body.title) product["title"] = req.body.title;
      if (req.body.images) product["images"] = req.body.images;
      if (req.body.description) product["description"] = req.body.description;
      if (req.body.price) product["price"] = req.body.price;
      if (req.body.size) product["size"] = req.body.size;
      if (req.body.in_stock) product["in_stock"] = req.body.in_stock;
      if (req.body.order_type) product["order_type"] = req.body.order_type;
      if (req.body.brand_name) product["brand_name"] = req.body.brand_name;
      if (req.body.category) product["category"] = req.body.category;
      if (req.body.benefits) product["benefits"] = req.body.benefits;
      await product.save();
      return res.status(200).json({
        status: "success",
        message: "Product updated successfully.",
        data: product,
      });
    } else {
      return res.status(404).json({
        status: "failure",
        message: "Product not found.",
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

module.exports.deleteProduct = async (req, res) => {
  try {
    const product_id = req.params.productID;
    await Product.deleteOne({ _id: product_id });
    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully.",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: err.message,
    });
  }
};
