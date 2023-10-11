const {
  createProduct,
  getProducts,
  getNewProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./product.service");

require("dotenv").config();

module.exports = {
  createProduct: (req, res) => {
    const body = req.body;
    createProduct(body, (err, results) => {
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
  getProductById: (req, res) => {
    const id = req.params.id;
    getProductById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        succes: 1,
        data: results,
      });
    });
  },
  getProducts: (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    if (qNew != undefined && qNew) {
      getNewProducts((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "No products Found",
          });
        }
        return res.json({
          succes: 1,
          data: results,
        });
      });
    } else if (qCategory != undefined) {
      getProductsByCategory(qCategory, (err, results, category) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "No product Found",
          });
        }
        return res.json({
          succes: 1,
          data: results,
        });
      });
    } else {
      getProducts((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "No product Found",
          });
        }
        return res.json({
          success: 1,
          data: results,
        });
      });
    }
  },
  updateProduct: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    updateProduct(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          succes: 0,
          message: "Failed to update user",
        });
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteProduct: (req, res) => {
    const id = req.params.id;
    deleteProduct(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "product deleted successfully",
      });
    });
  },
};
