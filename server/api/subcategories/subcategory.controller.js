const {
  createSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
} = require("./subcategory.service");

require("dotenv").config();

module.exports = {
  createSubcategory: (req, res) => {
    const body = req.body;
    createSubcategory(body, (err, results) => {
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
  getSubcategories: (req, res) => {
    const qCategory = req.query.category;
    getSubcategories(qCategory, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No subcategory Found",
        });
      }
      return res.json({
        succes: 1,
        data: results,
      });
    });
  },
  updateSubcategory: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    updateSubcategory(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          succes: 0,
          message: "Failed to update subcategory",
        });
      }
      return res.json({
        succes: 1,
        message: "updated successfully",
      });
    });
  },
  deleteSubcategory: (req, res) => {
    const id = req.params.id;
    deleteSubcategory(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        succes: 1,
        message: "subcategory deleted successfully",
      });
    });
  },
};
