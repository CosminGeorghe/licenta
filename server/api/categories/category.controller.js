const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("./category.service");

require("dotenv").config();

module.exports = {
  createCategory: (req, res) => {
    const body = req.body;
    createCategory(body, (err, results) => {
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
  getCategories: (req, res) => {
    getCategories((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No User Found",
        });
      }
      return res.json({
        succes: 1,
        data: results,
      });
    });
  },
  updateCategory: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    updateCategory(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          succes: 0,
          message: "Failed to update category",
        });
      }
      return res.json({
        succes: 1,
        message: "updated successfully",
      });
    });
  },
  deleteCategory: (req, res) => {
    const id = req.params.id;
    deleteCategory(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        succes: 1,
        message: "category deleted successfully",
      });
    });
  },
};
