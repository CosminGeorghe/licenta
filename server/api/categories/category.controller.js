const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./category.service");

require("dotenv").config();

const { sign } = require("jsonwebtoken");

module.exports = {
  createCategory: (req, res) => {
    const body = req.body;
    console.log(res.body);
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
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
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
  updateUser: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(id, body, (err, results) => {
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
        succes: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    deleteUser(id, data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        succes: 1,
        message: "user deleted successfully",
      });
    });
  },
};
