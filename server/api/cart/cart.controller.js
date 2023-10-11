const {
  addProductToCart,
  addProductsToCart,
  getCartProducts,
  deleteProductsFromCart,
  updateProductQuantityById,
} = require("./cart.service");

require("dotenv").config();

module.exports = {
  addProductToCart: (req, res) => {
    const user_id = req.params.user_id;
    const product_id = req.params.product_id;
    const quantity = req.params.quantity;
    addProductToCart(user_id, product_id, quantity, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        succes: 1,
        data: results,
      });
    });
  },

  addProductsToCart: (req, res) => {
    const user_id = req.params.user_id;
    const body=req.body
    addProductsToCart(user_id, body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        succes: 1,
        data: results,
      });
    });
  },
  getCartProducts: (req, res) => {
    const user_id = req.params.user_id;
    getCartProducts(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No Products Found",
        });
      }
      return res.json({
        succes: 1,
        data: results,
      });
    });
  },
  updateProductQuantityById: (req, res) => {
    const user_id = req.params.id;
    const product_id = req.params.id;
    const quantity = req.params.quantity;
    const body = req.body;
    updateProductQuantityById(user_id, product_id, body, quantity, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          succes: 0,
          message: "Failed to update",
        });
      }
      return res.json({
        succes: 1,
        message: "updated successfully",
      });
    });
  },
  deleteProductsFromCart: (req, res) => {
    const user_id = req.params.user_id;
    deleteProductsFromCart(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        succes: 1,
        message: "product deleted successfully",
      });
    });
  },
};
